import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useRQXgboost } from '@/api';
import { message } from 'antd';

const { useRef, useState, useEffect, useMemo } = React;

const useXgboost = () => {
  const [xgboostReqParams, setXgboostReqParams] = useState({
    enableRequest: false,
    onSuccess: () => {
      setXgboostReqParams({
        ...xgboostReqParams,
        enableRequest: false,
      });
    },
    onError: (err: API.ErrorResp) => {
      message.error(`Load data error: ${err?.response?.data?.error}`);
      setXgboostReqParams({
        ...xgboostReqParams,
        enableRequest: false,
      });
    },
  });

  const { isLoading, isSuccess, isError, data, error } = useRQXgboost({
    enabled: xgboostReqParams?.enableRequest,
    retry: false,
    cacheTime: 0,
    onSuccess: xgboostReqParams?.onSuccess,
    onError: xgboostReqParams?.onError,
  });

  return {
    isLoading,
    isSuccess,
    isError,
    data,
    error,
    xgboostReqParams,
    setXgboostReqParams,
  };
};

export default useXgboost;
