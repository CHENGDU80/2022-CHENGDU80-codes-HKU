import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Form, Select, Slider, Switch, Typography } from 'antd';
import { useRecoilState } from 'recoil';
import { useForm } from 'antd/lib/form/Form';
import { dashboardState } from '@stores/dashboard';
import { FieldData } from '@typings';

const { useRef, useState, useEffect, useMemo } = React;

interface PieChartCustomStyleProps {}

const PieChartCustomStyle: React.FC<PieChartCustomStyleProps> = (
  props: PieChartCustomStyleProps
) => {
  const {} = props;

  const [{ pieChartVisualizationSettings }, setDataTableState] =
    useRecoilState(dashboardState);

  const formattedPieChartVisualizationSettings = {
    ...pieChartVisualizationSettings,
  };

  const syncPieChartSettings = (allFields: FieldData[]) => {
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

    setDataTableState(prevState => {
      return {
        ...prevState,
        pieChartVisualizationSettings: {
          ...prevState.pieChartVisualizationSettings,
          ...mergedSettings,
        },
      };
    });
  };

  const [form] = useForm();

  useEffect(() => {
    const formattedPieChartVisualizationSettings = {
      ...pieChartVisualizationSettings,
    };
    (
      form as unknown as { setFieldsValue: (val: unknown) => unknown }
    )?.setFieldsValue?.(formattedPieChartVisualizationSettings);
  }, []);

  return (
    <>
      <Typography.Title level={5}>Negative Sample in Total</Typography.Title>
      <Form
        form={form}
        layout="vertical"
        onFieldsChange={(_: FieldData, allFields: FieldData[]) => {
          syncPieChartSettings(allFields);
        }}
        initialValues={formattedPieChartVisualizationSettings}
      >
        <Form.Item name="height" label="Height">
          <Slider min={0} max={2000} />
        </Form.Item>
        <Form.Item name="width" label="Height">
          <Slider min={0} max={2000} />
        </Form.Item>
        <Form.Item
          label="Show Legend"
          name="hasLegends"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </>
  );
};

export default PieChartCustomStyle;
