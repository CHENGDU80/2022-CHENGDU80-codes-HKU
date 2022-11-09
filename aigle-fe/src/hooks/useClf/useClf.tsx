import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useRQClf } from '@/api';
import { message } from 'antd';

const { useRef, useState, useEffect, useMemo } = React;

const useClf = () => {
  const [clfReqParams, setClfReqParams] = useState({
    enableRequest: false,
    onSuccess: () => {
      setClfReqParams({
        ...clfReqParams,
        enableRequest: false,
      });
    },
    onError: (err: API.ErrorResp) => {
      message.error(`Load data error: ${err?.response?.data?.error}`);
      setClfReqParams({
        ...clfReqParams,
        enableRequest: false,
      });
    },
  });

  const { isLoading, isSuccess, isError, data, error } = useRQClf({
    enabled: clfReqParams?.enableRequest,
    retry: false,
    cacheTime: 0,
    onSuccess: clfReqParams?.onSuccess,
    onError: clfReqParams?.onError,
  });

  return {
    isLoading,
    isSuccess,
    isError,
    data,
    error,
    clfReqParams,
    setClfReqParams,
  };
};

export default useClf;
