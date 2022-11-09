import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { ReactComponent as DataSvg } from '@/assets/illustration/data.svg';
import { Button, Typography } from 'antd';
import useClf from '@/hooks/useClf';
import { useRecoilState } from 'recoil';
import { dashboardState } from '@/stores/dashboard';
import Loading from '@components/illustration/loading';
import Graph from '../graph';

const { Title } = Typography;

const { useRef, useState, useEffect, useMemo } = React;

const ContainerSection = styled.section`
  padding: 24px;
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

interface ClfProps {}

const Clf: React.FC<ClfProps> = (props: ClfProps) => {
  const {} = props;

  const {
    isLoading,
    isError,
    isSuccess,
    data,
    error,
    clfReqParams,
    setClfReqParams,
  } = useClf();

  const [dbState, setDbState] = useRecoilState(dashboardState);

  const { clfStatus, model } = dbState;

  return (
    <>
      {!isSuccess && (
        <ContainerSection>
          <DataSvg></DataSvg>
          <Title
            level={3}
            style={{
              marginTop: '24px',
              textAlign: 'center',
            }}
          >
            Clf
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
                setClfReqParams({
                  ...clfReqParams,
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
        </ContainerSection>
      )}
      {isSuccess && <Graph model={model} data={data?.data}></Graph>}
    </>
  );
};

export default Clf;
