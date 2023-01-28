import dotenv from 'dotenv';

const { parsed } = globalThis.process ? dotenv.config() : { parsed: undefined };
const config = {
  API_ENDPOINT_ROOT: parsed?.API_ENDPOINT_ROOT ?? '/api',
  MODE:
    parsed?.MODE ?? globalThis.process?.env?.PRODUCTION
      ? 'production'
      : 'development'
};

export default config;
