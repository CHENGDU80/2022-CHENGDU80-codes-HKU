import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useStartLoadData } from '@/api';
import { message } from 'antd';

const { useRef, useState, useEffect, useMemo } = React;

const useLoadTrainingData = () => {
  const [startLoadDataReqParams, setStartLoadDataReqParams] = useState({
    enableRequest: false,
    onSuccess: () => {
      setStartLoadDataReqParams({
        ...startLoadDataReqParams,
        enableRequest: false,
      });
    },
    onError: (err: API.ErrorResp) => {
      message.error(`Load data error: ${err?.response?.data?.error}`);
      setStartLoadDataReqParams({
        ...startLoadDataReqParams,
        enableRequest: false,
      });
    },
  });

  const { isLoading, isSuccess, isError, data, error } = useStartLoadData({
    enabled: startLoadDataReqParams?.enableRequest,
    retry: false,
    cacheTime: 0,
    onSuccess: startLoadDataReqParams?.onSuccess,
    onError: startLoadDataReqParams?.onError,
  });

  return {
    isLoading,
    isSuccess,
    isError,
    data,
    error,
    startLoadDataReqParams,
    setStartLoadDataReqParams,
  };
};

export default useLoadTrainingData;
