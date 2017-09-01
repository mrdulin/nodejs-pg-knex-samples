import './env';

interface ICredentials {
  SQL_HOST: string;
  SQL_DATABASE: string;
  SQL_USER: string;
  SQL_PORT: string | number;
  SQL_PASSWORD: string;
}

function loadEnvVars(key: keyof ICredentials, defaultValue: number): number;
function loadEnvVars(key: keyof ICredentials, defaultValue: string): string;
function loadEnvVars(key: keyof ICredentials, defaultValue: number | string): number | string {
  if (typeof defaultValue === 'string') {
    return process.env[key] || defaultValue;
  } else if (typeof defaultValue === 'number') {
    if (process.env.key) {
      return Number.parseInt(process.env.key, 10) || defaultValue;
    }
  }
  return '';
}

const credentials: ICredentials = {
  SQL_HOST: loadEnvVars('SQL_HOST', '127.0.0.1'),
  SQL_DATABASE: loadEnvVars('SQL_DATABASE', 'nodejs-pg-knex-samples'),
  SQL_USER: loadEnvVars('SQL_USER', 'sampleadmin'),
  SQL_PORT: loadEnvVars('SQL_PORT', 5431),
  SQL_PASSWORD: loadEnvVars('SQL_PASSWORD', 'samplepass')
};

export { credentials };