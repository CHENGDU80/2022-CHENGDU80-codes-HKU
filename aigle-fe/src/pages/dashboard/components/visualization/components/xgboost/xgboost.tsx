import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ReactComponent as Analytics } from '@/assets/illustration/analytics.svg';
import { Button, Typography } from 'antd';
import useXgboost from '@/hooks/useXgboost';
import Loading from '@components/illustration/loading';
import { useRecoilState } from 'recoil';
import { dashboardState } from '@stores/dashboard';
import Graph from '../graph';

const { Title } = Typography;

const { useRef, useState, useEffect, useMemo } = React;

interface XgboostProps {}

const ContainerSection = styled.section`
  margin: 0 auto;
  width: fit-content;
`;

const LoadingSection = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 64px;
`;

const ButtonSection = styled.section`
  display: flex;
  justify-content: center;
`;

const Xgboost: React.FC<XgboostProps> = (props: XgboostProps) => {
  const {} = props;

  const [dbState, setDbState] = useRecoilState(dashboardState);

  const { xgboostStatus, model } = dbState;

  const {
    isLoading,
    isError,
    isSuccess,
    data,
    error,
    xgboostReqParams,
    setXgboostReqParams,
  } = useXgboost();

  return (
    <>
      {!isSuccess && (
        <ContainerSection>
          <section
            css={css`
              padding: 24px;
            `}
          >
            <Analytics></Analytics>
            <Title
              level={3}
              style={{
                marginTop: '24px',
                textAlign: 'center',
              }}
            >
              Xgboost
            </Title>
            <ButtonSection>
              <Button
                type="primary"
                style={{
                  borderRadius: 24,
                  minWidth: 200,
                  height: 48,
                  fontSize: 16,
                  fontWeight: 700,
                  padding: '0 24px',
                  margin: '24px auto',
                }}
                loading={isLoading}
                onClick={() => {
                  setXgboostReqParams({
                    ...xgboostReqParams,
                    enableRequest: true,
                    onError: error => {
                      setDbState(prev => ({
                        ...prev,
                        xgboostStatus: 'error',
                      }));
                    },
                    onSuccess: () => {
                      setDbState(prev => ({
                        ...prev,
                        xgboostStatus: 'analyzed',
                      }));
                    },
                  });
                }}
              >
                {isLoading && 'Analyzing...'}
                {!isLoading && 'Analyze >'}
              </Button>
            </ButtonSection>
            {isLoading && (
              <LoadingSection>
                <Loading></Loading>
              </LoadingSection>
            )}
          </section>
        </ContainerSection>
      )}
      {isSuccess && <Graph model={model} data={data?.data}></Graph>}
    </>
  );
};

export default Xgboost;
