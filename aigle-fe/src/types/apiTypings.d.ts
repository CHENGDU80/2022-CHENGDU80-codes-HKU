declare namespace API {
  export interface BaseResp {
    code?: number | undefined;
    message?: string | undefined;
  }

  export type ErrorData = {
    error: string;
    status: number;
  };

  export type ErrorResp = AxiosError<ErrorData>;

  export interface StartLoadDataResponse {
    data: string;
    baseResponse: BaseResp | undefined;
  }

  export interface PreProcessDataResponse {
    data: string;
    baseResponse: BaseResp | undefined;
  }

  export interface XgboostResponse {
    data: XgboostResponseData;
    baseResponse: BaseResp | undefined;
  }

  export interface XgboostResponseData {
    ROC: Roc;
    histogram: Histogram;
  }

  export interface Roc {
    fpHorizontalAxis: number[];
    tpVerticalAxis: number[];
  }

  export interface Histogram {
    horizontalAxis: string[];
    verticalAxis: number[];
  }

  export interface ClfResponse {
    data: ClfResponseData;
    baseResponse: BaseResp | undefined;
  }

  export interface ClfResponseData {
    ROC: ClfRoc;
  }

  export interface ClfRoc {
    horizontal: number[];
    vertical: number[];
  }
}
