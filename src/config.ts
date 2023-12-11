export const envTypes = {
    dev: 'development',
    prod: 'production',
    stage: 'staging',
  };
  
  const envType =
    process.env.REACT_APP_ENV || envTypes.dev;
  
  const apiVersion = process.env.REACT_APP_API_VERSION ?? 'v1';
  const apiUrl = process.env.REACT_APP_API_URL ?? '';
  const appId = process.env.REACT_APP_API_SB_ID ?? '';
  
  export const isDev = envType === envTypes.dev;

  const config = {
    apiUrl: `${apiUrl}/${apiVersion}`,
    envType,
    appId: `${appId}`
  };
  
  export default config;  