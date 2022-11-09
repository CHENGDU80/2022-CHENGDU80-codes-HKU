import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { trainingState } from '@/stores/training';
import Locked from '@components/illustration/locked';
import { PageHeader } from 'antd';
import useResizable from '@/hooks/useResizable';
import Resizer from '@components/resizer';
import { IconMoreStroked } from '@douyinfe/semi-icons';
import { COLOR_PALETTE } from '@/const/theme/color';

const { useRef, useState, useEffect, useMemo } = React;

interface DashboardProps {}

const LEFT_HIDDEN_SIZE = 145;

const Container = styled.section`
  max-height: calc(100vh - 48px);
  height: calc(100vh - 48px);
  overflow-y: hidden;
`;

const ResizeWrapper = styled.section`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const DataBoardWrapperSection = styled.section``;

const DataBoardContent = styled.section`
  max-height: calc(100vh - 48px);
  height: calc(100vh - 48px);
  overflow-y: hidden;
`;

const GraphTableWrapperSection = styled.section``;

const INIT_LEFT_SIZE = 222;

const Dashboard: React.FC<DashboardProps> = (props: DashboardProps) => {
  const {} = props;

  const train = useRecoilValue(trainingState);

  const { step } = train;

  const { size: resizableSize, handler: sizeHandler } = useResizable({
    size: INIT_LEFT_SIZE,
    maxSize: 300,
    direction: 'right',
  }) as {
    size: number;
    handler: (event: React.MouseEvent | React.TouchEvent) => void;
  };

  return (
    <Container>
      {step !== 'preprocessingFinished' && (
        <section
          css={css`
            padding: 24px;
            margin: 48px;
          `}
        >
          <Locked desc="You could not proceed to this page when the training process is not finished."></Locked>
        </section>
      )}

      {step === 'preprocessingFinished' && (
        <ResizeWrapper>
          {resizableSize > LEFT_HIDDEN_SIZE && (
            <DataBoardWrapperSection
              style={{
                width: resizableSize,
              }}
            >
              <DataBoardContent>
                <div>
                  <PageHeader title="Dashboard"></PageHeader>
                </div>
              </DataBoardContent>
            </DataBoardWrapperSection>
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
          <GraphTableWrapperSection
            style={{
              width:
                resizableSize > LEFT_HIDDEN_SIZE
                  ? `calc(100% - ${resizableSize}px)`
                  : '100%',
            }}
          >
            <div>graph table</div>
          </GraphTableWrapperSection>
        </ResizeWrapper>
      )}
    </Container>
  );
};

export default Dashboard;
