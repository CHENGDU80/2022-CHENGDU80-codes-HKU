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
}
