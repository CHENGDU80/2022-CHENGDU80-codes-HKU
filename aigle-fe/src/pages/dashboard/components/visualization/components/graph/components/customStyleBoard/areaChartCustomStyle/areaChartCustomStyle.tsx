import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Form, Select, Slider, Switch, Typography } from 'antd';
import { useRecoilState } from 'recoil';
import { useForm } from 'antd/lib/form/Form';
import { dashboardState } from '@stores/dashboard';
import { FieldData } from '@/typings';

const { useRef, useState, useEffect, useMemo } = React;

interface AreaChartCustomStyleProps {}

const AreaChartCustomStyle: React.FC<AreaChartCustomStyleProps> = (
  props: AreaChartCustomStyleProps
) => {
  const {} = props;

  const [{ areaChartVisualizationSettings }, setDashboardState] =
    useRecoilState(dashboardState);

  const formattedAreaChartVisualizationSettings = {
    ...areaChartVisualizationSettings,
  };

  const syncAreaChartSettings = (allFields: FieldData[]) => {
    const mergedSettings =
      allFields.reduce((acc, cur) => {
        if (Array.isArray(cur.name)) {
          const key = cur.name?.[0] || '';
          if (key) {
            return {
              ...acc,
              [key]: cur.value,
            };
          } else {
            return acc;
          }
        } else {
          return {
            ...acc,
            [cur.name as string | number]: cur.value,
          };
        }
      }, {}) || {};

    setDashboardState(prevState => {
      return {
        ...prevState,
        areaChartVisualizationSettings: {
          ...prevState.areaChartVisualizationSettings,
          ...mergedSettings,
        },
      };
    });
  };

  const [form] = useForm();

  useEffect(() => {
    const formattedAreaChartVisualizationSettings = {
      ...areaChartVisualizationSettings,
    };
    (
      form as unknown as { setFieldsValue: (val: unknown) => unknown }
    )?.setFieldsValue?.(formattedAreaChartVisualizationSettings);
  }, []);

  return (
    <>
      <Typography.Title level={5}>Custom ROC Curve</Typography.Title>
      <Form
        form={form}
        layout="vertical"
        onFieldsChange={(_: FieldData, allFields: FieldData[]) => {
          syncAreaChartSettings(allFields);
        }}
        initialValues={formattedAreaChartVisualizationSettings}
      >
        <Form.Item name="height" label="Height">
          <Slider min={0} max={2000} />
        </Form.Item>
        <Form.Item name="width" label="Width">
          <Slider min={0} max={2000} />
        </Form.Item>
        <Form.Item
          label="Enable Points"
          name="enablePoints"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="Has Legends"
          name="hasLegends"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item label="Curve Shape" name="curve">
          <Select>
            <Select.Option value="linear">Linear</Select.Option>
            <Select.Option value="basis">Basic</Select.Option>
            <Select.Option value="cardinal">Cardinal</Select.Option>
            <Select.Option value="catmullRom">CatmullRom</Select.Option>
            <Select.Option value="monotoneX">MonotoneX</Select.Option>
            <Select.Option value="monotoneY">MonotoneY</Select.Option>
            <Select.Option value="natural">Natural</Select.Option>
            <Select.Option value="step">Step</Select.Option>
            <Select.Option value="stepAfter">StepAfter</Select.Option>
            <Select.Option value="stepBefore">StepBefore</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="lineWidth" label="Line Width">
          <Slider
            min={1}
            max={10}
            marks={{
              0: '0',
              5: '5',
              10: '10',
            }}
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default AreaChartCustomStyle;
