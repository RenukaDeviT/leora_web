export enum EHttpMethods {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
  }

  export enum EResponseStatusCodes {
    Unauthorized = 401,
    OK = 200,
    UnprocessableContent = 422,
  }

  export type TWindowSize = {
    width?: number;
    height?: number;
  };

  export type TCommonResponseType<T> = {
    data: T;
  };

  export type TUser = {
    roomId: string;
    sbUserId: string;
    sbUserCallAccessToken: string;
  };