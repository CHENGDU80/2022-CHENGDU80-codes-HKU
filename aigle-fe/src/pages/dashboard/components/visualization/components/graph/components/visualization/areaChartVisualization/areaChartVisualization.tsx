import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const { useRef, useState, useEffect, useMemo } = React;
import { ResponsiveLine } from '@nivo/line';
import { useRecoilState } from 'recoil';
import { dashboardState } from '@/stores/dashboard';

interface AreaChartVisualizationProps {
  data?: API.Roc
}

const EDGE_DISTANCE = 14;

const Container = styled.section`
  padding: ${EDGE_DISTANCE}px;
  height: 1200px;
`;

const AreaChartVisualization: React.FC<AreaChartVisualizationProps> = (
  props: AreaChartVisualizationProps
) => {
  const [dbStore, setDashboardState] = useRecoilState(dashboardState);
  const { areaChartVisualizationSettings } = dbStore;
  const { data } = props;

  const lineData: Array<{
    id: string | number;
    data: Array<{
      x: number | string | Date;
      y: number | string | Date;
    }>;
  }> = useMemo(() => {
    return [
      {
        id: 'ROC',
        data: data?.fpHorizontalAxis?.map?.((fp, idx) => {
          return {
            x: fp,
            y: data.tpVerticalAxis[idx],
          };
        }),
      },
    ];
  }, [data]);

  const lineProps = {
    data: lineData,
    margin: { top: 20, right: 20, bottom: 60, left: 80 },
    animate: true,
  };

  if (areaChartVisualizationSettings.hasLegends) {
    lineProps.legends = [
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 0,
        translateY: 0,
        itemWidth: 100,
        itemHeight: 20,
        itemsSpacing: 4,
        symbolSize: 20,
        symbolShape: 'circle',
        itemDirection: 'left-to-right',
        itemTextColor: '#777',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1,
            },
          },
        ],
      },
    ];
  }

  return (
    <Container>
      <ResponsiveLine
        // yScale={{
        //   type: 'linear',
        //   stacked: true,
        // }}
        enableSlices="x"
        {...lineProps}
        {...areaChartVisualizationSettings}
        enableArea={true}
        axisBottom={null}
      ></ResponsiveLine>
    </Container>
  );
};

export default AreaChartVisualization;
