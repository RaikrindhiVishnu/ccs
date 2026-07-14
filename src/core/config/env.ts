export const env = {
  AUTH_API_BASE_URL: import.meta.env.VITE_AUTH_API_BASE_URL || 'http://localhost:3000/api',
  ROLE_MANAGER_API_BASE_URL: import.meta.env.VITE_ROLE_MANAGER_API_BASE_URL || 'https://adttk4j6t7.execute-api.ap-south-1.amazonaws.com',
  CCS_API_BASE_URL: import.meta.env.VITE_CCS_API_BASE_URL || 'https://bcw7qty3wg.execute-api.ap-south-1.amazonaws.com',
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
