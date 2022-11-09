import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const { useRef, useState, useEffect, useMemo } = React;
import { Pie } from '@nivo/pie';
import { useRecoilState } from 'recoil';
import Empty from '@components/illustration/empty';
import { cloneDeep } from 'lodash';
import { dashboardState } from '@stores/dashboard';

interface PieChartVisualizationProps {}

const EDGE_DISTANCE = 14;

const deDupAndMerge = (
  pieData: Array<{
    // must be unique for the whole dataset
    id: string | number;
    value: number;
  }>
) => {
  let clonedPieData = cloneDeep(pieData);
  for (let i = 0; i < clonedPieData.length; i++) {
    let j = i + 1;
    while (j < clonedPieData.length) {
      if (clonedPieData[i].id === clonedPieData[j].id) {
        clonedPieData[i].value += clonedPieData[j].value;
        clonedPieData = [
          ...clonedPieData.slice(0, j),
          ...clonedPieData.slice(j + 1),
        ];
      } else {
        j += 1;
      }
    }
  }
  return clonedPieData;
};

const PieChartVisualization: React.FC<PieChartVisualizationProps> = (
  props: PieChartVisualizationProps
) => {
  const {} = props;

  const [dbStore, setDbStore] = useRecoilState(dashboardState);
  const { pieChartVisualizationSettings } = dbStore;

  const pieData: Array<{
    // must be unique for the whole dataset
    id: string | number;
    value: number;
  }> = useMemo(
    () =>
      deDupAndMerge([
        {
          id: 'Negitive Sample',
          value: 44.33,
        },
        {
          id: 'Positive Sample',
          value: 55.67,
        },
      ]),
    []
  );

  let commonProperties = {
    width: 900,
    height: 500,
    data: pieData,
    margin: { top: 80, right: 120, bottom: 80, left: 120 },
    animate: true,
    activeOuterRadiusOffset: 8,
  };

  if (pieChartVisualizationSettings?.hasLegends) {
    commonProperties.legends = [
      {
        anchor: 'bottom',
        direction: 'row',
        justify: false,
        translateX: 30,
        translateY: 56,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: '#999',
        itemDirection: 'left-to-right',
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: 'circle',
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#000',
            },
          },
        ],
      },
    ];
  }

  return (
    <>
      <section>
        <Pie
          {...commonProperties}
          {...pieChartVisualizationSettings}
          startAngle={90}
          endAngle={-90}
          innerRadius={0.6}
        ></Pie>
      </section>
    </>
  );
};

export default PieChartVisualization;
