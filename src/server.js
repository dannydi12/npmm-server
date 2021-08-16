const knex = require('knex');
const { parse } = require('pg-connection-string');
const app = require('./app');
const { PORT, DATABASE_URL } = require('../config');

const pgconfig = parse(DATABASE_URL);
pgconfig.ssl = { rejectUnauthorized: false };

const db = knex({
  client: 'pg',
  connection: pgconfig,
});

app.set('db', db);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${PORT}`);
});
