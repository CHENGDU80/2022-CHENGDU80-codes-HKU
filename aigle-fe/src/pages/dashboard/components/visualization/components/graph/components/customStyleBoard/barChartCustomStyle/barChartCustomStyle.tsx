import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { useForm } from 'antd/lib/form/Form';
import { Form, Radio, Select, Slider, Typography } from 'antd';
import { dashboardState } from '@stores/dashboard';
import { FieldData } from '@/typings';

const { useRef, useState, useEffect, useMemo } = React;

interface BarChartCustomStyleProps {}

const EDGE_DISTANCE = 14;

const Container = styled.section`
  padding: ${EDGE_DISTANCE}px;
`;

const BarChartCustomStyle: React.FC<BarChartCustomStyleProps> = (
  props: BarChartCustomStyleProps
) => {
  const {} = props;

  const [{ barChartVisualizationSettings }, setDashBoardState] =
    useRecoilState(dashboardState);

  const destructedSettings = useMemo(() => {
    return {
      ...barChartVisualizationSettings,
      'margin.top': barChartVisualizationSettings.margin.top,
      'margin.right': barChartVisualizationSettings.margin.right,
      'margin.bottom': barChartVisualizationSettings.margin.bottom,
      'margin.left': barChartVisualizationSettings.margin.left,
    };
  }, [barChartVisualizationSettings]);

  const syncBarChartSettings = (allFields: FieldData[]) => {
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

    const formattedMergedSettings = {
      ...mergedSettings,
      margin: {
        top: mergedSettings['margin.top'],
        right: mergedSettings['margin.right'],
        bottom: mergedSettings['margin.bottom'],
        left: mergedSettings['margin.left'],
      },
    };

    setDashBoardState(prevState => {
      return {
        ...prevState,
        barChartVisualizationSettings: {
          ...prevState.barChartVisualizationSettings,
          ...formattedMergedSettings,
        },
      };
    });
  };

  const [form] = useForm();

  useEffect(() => {
    (
      form as unknown as { setFieldsValue: (val: unknown) => unknown }
    )?.setFieldsValue?.(destructedSettings);
  }, []);

  return (
    <Container>
      <Typography.Title level={5}>
        Customize Feature Importance
      </Typography.Title>
      <Form
        form={form}
        layout="vertical"
        onFieldsChange={(_: FieldData, allFields: FieldData[]) => {
          syncBarChartSettings(allFields);
        }}
        initialValues={destructedSettings}
      >
        <Form.Item name="margin.top" label="Margin Top">
          <Slider
            min={0}
            max={200}
            marks={{
              0: '0',
              40: '40',
              80: '80',
              120: '120',
              160: '160',
              200: '200',
            }}
          />
        </Form.Item>
        <Form.Item name="margin.bottom" label="Margin Bottom">
          <Slider
            min={0}
            max={200}
            marks={{
              0: '0',
              40: '40',
              80: '80',
              120: '120',
              160: '160',
              200: '200',
            }}
          />
        </Form.Item>
        <Form.Item name="margin.left" label="Margin Left">
          <Slider
            min={0}
            max={200}
            marks={{
              0: '0',
              40: '40',
              80: '80',
              120: '120',
              160: '160',
              200: '200',
            }}
          />
        </Form.Item>
        <Form.Item name="margin.right" label="Margin Right">
          <Slider
            min={0}
            max={200}
            marks={{
              0: '0',
              40: '40',
              80: '80',
              120: '120',
              160: '160',
              200: '200',
            }}
          />
        </Form.Item>
        <Form.Item name="height" label="Height">
          <Slider min={0} max={2000} />
        </Form.Item>
        <Form.Item name="width" label="Width">
          <Slider min={0} max={2000} />
        </Form.Item>
      </Form>
    </Container>
  );
};

export default BarChartCustomStyle;
