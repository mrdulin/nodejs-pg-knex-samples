import './env';

interface ICredentials {
  SQL_HOST: string;
  SQL_DATABASE: string;
  SQL_USER: string;
  SQL_PORT: number;
  SQL_PASSWORD: string;
  SQL_SSL: boolean;
}

function loadEnvVars(key: keyof ICredentials, defaultValue: number): number;
function loadEnvVars(key: keyof ICredentials, defaultValue: string): string;
function loadEnvVars(key: keyof ICredentials, defaultValue: boolean): boolean;
function loadEnvVars(key: keyof ICredentials, defaultValue: number | string | boolean): number | string | boolean {
  if (typeof defaultValue === 'string') {
    return process.env[key] || defaultValue;
  } else if (typeof defaultValue === 'number') {
    if (process.env.key) {
      return Number.parseInt(process.env.key, 10) || defaultValue;
    }
    return defaultValue;
  } else if (typeof defaultValue === 'boolean') {
    return process.env[key] === 'true' || defaultValue;
  }
  return '';
}

const credentials: ICredentials = {
  SQL_HOST: loadEnvVars('SQL_HOST', '127.0.0.1'),
  SQL_DATABASE: loadEnvVars('SQL_DATABASE', 'nodejs-pg-knex-samples'),
  SQL_USER: loadEnvVars('SQL_USER', 'sampleadmin'),
  SQL_PORT: loadEnvVars('SQL_PORT', 5431),
  SQL_PASSWORD: loadEnvVars('SQL_PASSWORD', 'samplepass'),
  SQL_SSL: loadEnvVars('SQL_SSL', false)
};

console.log('credentials: ', credentials);

export { credentials };
