import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useRQPreprocessData } from '@/api';
import { message } from 'antd';

const { useRef, useState, useEffect, useMemo } = React;

const usePreprocessData = () => {
  const [preprocessDataReqParams, setPreprocessDataReqParams] = useState({
    enableRequest: false,
    onSuccess: () => {
      setPreprocessDataReqParams({
        ...preprocessDataReqParams,
        enableRequest: false,
      });
    },
    onError: (err: API.ErrorResp) => {
      message.error(`Load data error: ${err?.response?.data?.error}`);
      setPreprocessDataReqParams({
        ...preprocessDataReqParams,
        enableRequest: false,
      });
    },
  });

  const { isLoading, isSuccess, isError, data, error } = useRQPreprocessData({
    enabled: preprocessDataReqParams?.enableRequest,
    retry: false,
    cacheTime: 0,
    onSuccess: preprocessDataReqParams?.onSuccess,
    onError: preprocessDataReqParams?.onError,
  });

  return {
    isLoading,
    isSuccess,
    isError,
    data,
    error,
    preprocessDataReqParams,
    setPreprocessDataReqParams,
  };
};

export default usePreprocessData;
