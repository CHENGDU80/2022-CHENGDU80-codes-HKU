import { AxiosError, AxiosResponse } from 'axios';
import { UseQueryOptions } from 'react-query';
import { useGet } from './request';

export const useStartLoadData = (
  queryOption?: Omit<
    UseQueryOptions<API.StartLoadDataResponse, API.ErrorResp>,
    'queryKey' | 'queryFn'
  >
) =>
  useGet<{}, API.StartLoadDataResponse>(
    '/data/load',
    '/data/load',
    {},
    {},
    queryOption || {}
  );

export const useRQPreprocessData = (
  queryOption?: Omit<
    UseQueryOptions<API.PreProcessDataResponse, API.ErrorResp>,
    'queryKey' | 'queryFn'
  >
) =>
  useGet<{}, API.PreProcessDataResponse>(
    '/data/preprocess',
    '/data/preprocess',
    {},
    {},
    queryOption || {}
  );
