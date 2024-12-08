const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres');  // Updated to use PostgreSQL by default

  const connections = {
    mysql: {
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false) && {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    postgres: {
      connection: {
        host: env('DATABASE_HOST', 'ep-mute-violet-a53jwbxj-pooler.us-east-2.aws.neon.tech'),  // PostgreSQL host
        port: env.int('DATABASE_PORT', 5432),  // PostgreSQL port
        database: env('DATABASE_NAME', 'ai-resume'),  // Your database name
        user: env('DATABASE_USERNAME', 'ai-resume_owner'),  // Your username
        password: env('DATABASE_PASSWORD', 'dOA3cqkWl5hP'),  // Your password
        ssl: {
          rejectUnauthorized: false,  // Set to false to bypass SSL certificate validation
        },
        schema: env('DATABASE_SCHEMA', 'public'),  // Default schema for PostgreSQL
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
