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

export const useRQXgboost = (
  queryOption?: Omit<
    UseQueryOptions<API.XgboostResponse, API.ErrorResp>,
    'queryKey' | 'queryFn'
  >
) =>
  useGet<{}, API.XgboostResponse>(
    '/data/xgboost',
    '/data/xgboost',
    {},
    {},
    queryOption || {}
  );

export const useRQClf = (
  queryOption?: Omit<
    UseQueryOptions<API.ClfResponse, API.ErrorResp>,
    'queryKey' | 'queryFn'
  >
) =>
  useGet<{}, API.ClfResponse>(
    '/data/clf',
    '/data/clf',
    {},
    {},
    queryOption || {}
  );
