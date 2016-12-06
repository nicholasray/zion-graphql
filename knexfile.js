module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: './db/migrations',
    tableName: 'migrations',
  },
  seeds: {
      directory: './db/seeds',
  }
};
