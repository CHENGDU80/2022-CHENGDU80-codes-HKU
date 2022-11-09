import React, { FC, useState, useEffect, useCallback } from 'react';
import { useStartLoadData } from '@/api';
import { Button, message, PageHeader } from 'antd';
import { AxiosError } from 'axios';
import Loading from '@/components/illustration/loading';
import { css } from '@emotion/react';
import ErrorIllustrator from '@/components/illustration/errorIllustrator';
import styled from '@emotion/styled';

import { ReactComponent as TrainingIllustration } from '@/assets/illustration/training_illustration.svg';
import useLoadTrainingData from '@/hooks/useLoadTrainingData';
import { useRecoilState } from 'recoil';
import { TrainingState, trainingState } from '@/stores/training';
import usePreprocessData from '@/hooks/usePreprocessData';
import { useNavigate } from 'react-router';

const ContainerSection = styled.section`
  max-width: 1200px;
  min-width: 600px;
  margin: 0 auto;
`;

const TrainingSVGSection = styled.section`
  display: flex;
  justify-content: center;
`;

const TrainingBtnSection = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 96px;
`;

const InfoSection = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 64px;
  text-align: center;
`;

const LoadingSection = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 64px;
`;

const btnTextMap: { [k in TrainingState['step']]: string } = {
  beforeLoadData: 'Start Training',
  loadingData: 'Loading Data...',
  loadDataFinished: '🥰 Next Step >',
  loadDataFailed: 'Retry',
  preprocessing: 'Preprocessing...',
  preprocessingFinished:
    '🎉 Preprocessing Done! Click to use models provided in dashboard to predict >',
  preprocessingFailed: 'Retry',
};

const infoTextMap: { [k in TrainingState['step']]: string | JSX.Element } = {
  beforeLoadData: '',
  loadingData: 'This step may take 1 or 2 minutes, please wait patiently.',
  loadDataFinished:
    'After deleting the missing data, your dataset has 73500 rows, 378 columns left. Click next step to preprocess the data.',
  loadDataFailed: 'Retry',
  preprocessing: 'Preprocessing...',
  preprocessingFinished: (
    <>
      <>Your dataset has 625 rows which have over 25% missing data.</>
      <br></br>
      <>
        Large percent of missing data will have a bad influence on our predict
        result, so we deleted them before we analysis your dataset.
      </>
      <br></br>
      <>You can use test dataset to predict the result now!</>
      <br></br>
    </>
  ),
  preprocessingFailed: 'Retry',
};

const overviewPage: React.FC = () => {
  const {
    isLoading,
    isSuccess,
    isError,
    data,
    error,
    startLoadDataReqParams,
    setStartLoadDataReqParams,
  } = useLoadTrainingData();

  const {
    isLoading: isPreProcessLoading,
    isError: isPreProcessError,
    isSuccess: isPreProcessSuccess,
    data: preprocessData,
    error: preprocessError,
    preprocessDataReqParams,
    setPreprocessDataReqParams,
  } = usePreprocessData();

  const [train, setTrainingState] =
    useRecoilState<TrainingState>(trainingState);

  const { step } = train;

  const navigate = useNavigate();

  const loadDataClickEvent = useCallback(() => {
    setTrainingState({ ...train, step: 'loadingData' });
    setStartLoadDataReqParams({
      ...startLoadDataReqParams,
      enableRequest: true,
      onSuccess: () => {
        setTrainingState(prev => ({
          ...prev,
          step: 'loadDataFinished',
        }));
      },
      onError: () => {
        setTrainingState(prev => ({
          ...prev,
          step: 'loadDataFailed',
        }));
      },
    });
  }, []);

  const loadDataFinishClickEvent = useCallback(() => {
    setTrainingState({ ...train, step: 'preprocessing' });
    setPreprocessDataReqParams({
      ...preprocessDataReqParams,
      enableRequest: true,
      onSuccess: () => {
        setTrainingState(prev => ({
          ...prev,
          step: 'preprocessingFinished',
        }));
      },
      onError: () => {
        setTrainingState(prev => ({
          ...prev,
          step: 'preprocessingFailed',
        }));
      },
    });
  }, []);

  return (
    <div
      css={css`
        padding: 24px;
      `}
    >
      <PageHeader title="Model Training"></PageHeader>
      <ContainerSection>
        <TrainingSVGSection>
          <TrainingIllustration></TrainingIllustration>
        </TrainingSVGSection>
        <TrainingBtnSection>
          <Button
            type="primary"
            style={{
              borderRadius: 24,
              minWidth: 200,
              height: 48,
              fontSize: 16,
              fontWeight: 700,
              padding: '0 24px',
            }}
            loading={isLoading}
            onClick={() => {
              switch (step) {
                case 'beforeLoadData':
                  loadDataClickEvent();
                  break;
                case 'loadDataFailed':
                  loadDataClickEvent();
                  break;
                case 'loadDataFinished':
                  loadDataFinishClickEvent();
                  break;
                case 'preprocessingFailed':
                  loadDataFinishClickEvent();
                  break;
                case 'preprocessingFinished':
                  navigate('/dashboard');
                  break;
                default:
                  break;
              }
            }}
          >
            {btnTextMap[step]}
          </Button>
        </TrainingBtnSection>
        <InfoSection>{infoTextMap[step]}</InfoSection>
        {(isLoading || isPreProcessLoading) && (
          <LoadingSection>
            <Loading></Loading>
          </LoadingSection>
        )}
        {(isError || isPreProcessError) && (
          <ErrorIllustrator
            desc={`Error message: ${error?.response?.data?.error}`}
          />
        )}
      </ContainerSection>
    </div>
  );
};

export default overviewPage;
