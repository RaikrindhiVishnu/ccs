export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'GLC-UI',
  APP_ENV: import.meta.env.VITE_APP_ENV || 'development',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || 'v1.0.0',
  
  ENABLE_MOCKS: import.meta.env.VITE_ENABLE_MOCKS === 'true',
  ENABLE_LOGS: import.meta.env.VITE_ENABLE_LOGS === 'true',
  
  AUTH_TOKEN_KEY: import.meta.env.VITE_AUTH_TOKEN_KEY || 'accessToken',
  AUTH_REFRESH_KEY: import.meta.env.VITE_AUTH_REFRESH_KEY || 'refreshToken',

  NODE_ENV: import.meta.env.MODE,
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const;

export type Env = typeof env;
