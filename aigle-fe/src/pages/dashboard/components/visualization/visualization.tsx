import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { dashboardState } from '@/stores/dashboard';
import Xgboost from './components/xgboost';
import Clf from './components/clf';

const { useRef, useState, useEffect, useMemo } = React;

interface VisualizationProps {}

const ContainerSection = styled.section`
  /* padding: 24px; */
`;

const Visualization: React.FC<VisualizationProps> = (
  props: VisualizationProps
) => {
  const [dbStore, setDbStore] = useRecoilState(dashboardState);

  const { model } = dbStore;

  return (
    <ContainerSection>
      {model === 'Xgboost' && <Xgboost></Xgboost>}
      {model === 'Clf' && <Clf></Clf>}
    </ContainerSection>
  );
};

export default Visualization;
