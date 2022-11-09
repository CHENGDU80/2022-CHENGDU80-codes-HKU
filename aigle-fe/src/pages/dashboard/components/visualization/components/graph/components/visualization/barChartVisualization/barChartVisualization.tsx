import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { COLOR_PALETTE } from '@/const/theme/color';
import { useRecoilState } from 'recoil';
import { BarDatum, Bar } from '@nivo/bar';
import { dashboardState } from '@stores/dashboard';

const { useRef, useState, useEffect, useMemo } = React;

interface BarChartVisualizationProps {
  data?: API.Histogram;
}

const EDGE_DISTANCE = 14;

const Container = styled.section`
  padding: ${EDGE_DISTANCE}px;
`;

const BarChartVisualization: React.FC<BarChartVisualizationProps> = (
  props: BarChartVisualizationProps
) => {
  const { data = [] } = props;

  console.log('%c data >>>', 'background: yellow; color: blue', data);

  const [dbStore, setDashBoardState] = useRecoilState(dashboardState);

  const barData: BarDatum[] = useMemo(() => {
    return (
      (data as API.Histogram)?.horizontalAxis?.map?.((d, idx) => ({
        trait: d,
        featureImportance: (data as API.Histogram)?.verticalAxis[idx],
      })) || []
    );
  }, [data]);

  console.log('%c barData  >>>', 'background: yellow; color: blue', barData);

  const { barChartVisualizationSettings } = dbStore;

  return (
    <Container>
      <Bar
        data={barData}
        keys={['featureImportance']}
        indexBy="trait"
        colors={{ scheme: 'nivo' }}
        labelTextColor={'inherit:darker(1.4)'}
        labelSkipWidth={16}
        labelSkipHeight={16}
        {...barChartVisualizationSettings}
      />
      <div
        style={{
          float: 'right',
          marginRight: EDGE_DISTANCE,
        }}
      ></div>
    </Container>
  );
};

export default BarChartVisualization;
