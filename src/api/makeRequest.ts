import { EHttpMethods } from 'utils/types';

import axiosInstance from './axios';

// General format for axios fetch
export default <T>({
  url = '/',
  method = EHttpMethods.GET,
  params = {},
  data = {},
  headers = {},
}): Promise<T> =>
  axiosInstance({
    url,
    method,
    headers,
    params,
    data,
  });
