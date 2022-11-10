import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import useResizable from '@/hooks/useResizable';
import Resizer from '@/components/resizer';
import { IconMoreStroked } from '@douyinfe/semi-icons';
import { COLOR_PALETTE } from '@/const/theme/color';
import { Tabs } from 'antd';
import AreaChartCustomStyle from './components/customStyleBoard/areaChartCustomStyle';
import BarChartCustomStyle from './components/customStyleBoard/barChartCustomStyle';
import PieChartCustomStyle from './components/customStyleBoard/pieChartCustomStyle';
import {
  AreaChartVisualization,
  BarChartVisualization,
  PieChartVisualization,
} from './components/visualization';
import { useRecoilState } from 'recoil';
import { dashboardState, SelectedGraphType } from '@/stores/dashboard';

const { TabPane } = Tabs;

const { useRef, useState, useEffect, useMemo } = React;

const INIT_LEFT_SIZE = 364;

const LEFT_HIDDEN_SIZE = 107;

const EDGE_DISTANCE = 14;

const Container = styled.section`
  overflow-y: hidden;
`;

const ResizeWrapper = styled.section`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: row;
  height: calc(100vh - 48px);
  overflow-y: hidden;
`;

const ViewSection = styled.section`
  width: calc(100% - 290px);
  height: calc(100vh - 48px);
  max-height: calc(100vh - 48px);
  overflow: auto;
`;

const AnalyzerWrapperSection = styled.section``;

const AnalyzerContent = styled.section`
  height: 100%;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-thumb {
    width: 4px;
    height: 4px;
  }
`;

const VisualizationWrapper = styled.section``;

interface GraphProps {
  model: 'Xgboost' | 'Clf';
  data?: API.XgboostResponseData | API.ClfResponseData;
}

const Graph: React.FC<GraphProps> = (props: GraphProps) => {
  const { model, data } = props;

  const [dbStore, setDbStore] = useRecoilState(dashboardState);

  const { size: resizableSize, handler: sizeHandler } = useResizable({
    size: INIT_LEFT_SIZE,
    maxSize: 1200,
    direction: 'right',
  }) as {
    size: number;
    handler: (event: React.MouseEvent | React.TouchEvent) => void;
  };

  const setGraphActiveKey = (activeKey: SelectedGraphType) => {
    setDbStore(prev => ({
      ...prev,
      selectedGraphType: activeKey,
    }));
  };

  return (
    <>
      <Container>
        <ResizeWrapper>
          {resizableSize > LEFT_HIDDEN_SIZE && (
            <AnalyzerWrapperSection
              style={{
                width: resizableSize,
              }}
            >
              <AnalyzerContent>
                {model === 'Xgboost' && (
                  <Tabs
                    onChange={setGraphActiveKey}
                    defaultActiveKey="areaChart"
                    centered
                  >
                    <TabPane
                      tab="ROC"
                      key="areaChart"
                      style={{
                        padding: 14,
                      }}
                    >
                      <AreaChartCustomStyle></AreaChartCustomStyle>
                    </TabPane>
                    <TabPane
                      tab="Feature Importance"
                      key="barChart"
                      style={{
                        padding: 14,
                      }}
                    >
                      <BarChartCustomStyle></BarChartCustomStyle>
                    </TabPane>
                  </Tabs>
                )}
                {model === 'Clf' && (
                  <Tabs
                    onChange={setGraphActiveKey}
                    defaultActiveKey="areaChart"
                    centered
                  >
                    <TabPane
                      tab="ROC"
                      key="areaChart"
                      style={{
                        padding: 14,
                      }}
                    >
                      <AreaChartCustomStyle></AreaChartCustomStyle>
                    </TabPane>
                    <TabPane
                      tab="Result"
                      key="pieChart"
                      style={{
                        padding: 14,
                      }}
                    >
                      <PieChartCustomStyle></PieChartCustomStyle>
                    </TabPane>
                  </Tabs>
                )}
              </AnalyzerContent>
            </AnalyzerWrapperSection>
          )}
          <Resizer
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
            }}
            onMouseDown={sizeHandler}
            onTouchStart={sizeHandler}
          >
            <IconMoreStroked
              style={{
                color: COLOR_PALETTE.AIGLE_HEADER_SEARCH_BG_HOVER,
                transform: 'rotate(90deg)',
              }}
            />
          </Resizer>
          <ViewSection
            style={{
              width:
                resizableSize > LEFT_HIDDEN_SIZE
                  ? `calc(100% - ${resizableSize}px)`
                  : '100%',
            }}
          >
            <VisualizationWrapper>
              {model === 'Xgboost' &&
                dbStore.selectedGraphType === 'areaChart' && (
                  <AreaChartVisualization
                    data={(data as API.XgboostResponseData)?.ROC}
                  ></AreaChartVisualization>
                )}
              {model === 'Xgboost' &&
                dbStore.selectedGraphType === 'barChart' && (
                  <BarChartVisualization
                    data={(data as API.XgboostResponseData)?.histogram}
                  ></BarChartVisualization>
                )}
              {model === 'Clf' && dbStore.selectedGraphType === 'areaChart' && (
                <AreaChartVisualization
                  data={
                    {
                      fpHorizontalAxis: (data as API.ClfResponseData)?.ROC
                        ?.horizontal,
                      tpVerticalAxis: (data as API.ClfResponseData)?.ROC
                        ?.vertical,
                    } as API.Roc
                  }
                ></AreaChartVisualization>
              )}
              {model === 'Clf' && dbStore.selectedGraphType === 'pieChart' && (
                <PieChartVisualization></PieChartVisualization>
              )}
            </VisualizationWrapper>
          </ViewSection>
        </ResizeWrapper>
      </Container>
    </>
  );
};

export default Graph;
