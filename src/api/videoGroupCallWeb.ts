import { EHttpMethods, TCommonResponseType, TUser } from "utils/types";
import makeRequest from "./makeRequest";

// function call
const path = "call";

// Parameter declaration
type TParams = {
  action?: string;
  user_id?: string;
  session_id?: string;
};

// Parameter declaration
type TPracParams = {
  action?: string;
  practitioner_id?: string;
  session_id?: string;
};

// API call fetch query for video call
export const user = (data: TParams): Promise<TCommonResponseType<TUser>> =>
  makeRequest<TCommonResponseType<TUser>>({
    url: `/${path}`,
    method: EHttpMethods.POST,
    data,
  });

export const partctitioner = (
  data: TPracParams
): Promise<TCommonResponseType<TUser>> =>
  makeRequest<TCommonResponseType<TUser>>({
    url: `/${path}`,
    method: EHttpMethods.POST,
    data,
  });
