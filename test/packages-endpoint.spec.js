const knex = require('knex');
const app = require('../src/app');
const assert = require('assert');

describe('/api/packages', () => {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => {
    return db.raw(
      `TRUNCATE
      users
      RESTART IDENTITY CASCADE;
    
    TRUNCATE  
      collections
      RESTART IDENTITY CASCADE;
    
    TRUNCATE
      packages
      RESTART IDENTITY CASCADE;`
    );
  });

  let token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbW9AZGVtby5jb20iLCJpYXQiOjE1ODkzNDA0NTcsInN1YiI6IjEifQ.KkhzaB4ipN6VnpwB6mgA8ywivXu9db2Po5bgvebq5n8';

  before('create base user', () => {
    return db.raw(
      `INSERT INTO users (email, password)
       VALUES
       ('demo@demo.com', '$2a$04$DjkbEZXF5djK5j/wgpjBY.vqOxiqvUk5tXUSlvwQIv0sOOmmFV/O6');`
    );
  });

  before('create a collection', () => {
    return db.raw(
      `INSERT INTO collections (user_id, collection_name)
         VALUES
         (1, 'test');`
    );
  });

  before('populate collection', () => {
    return db.raw(
      `INSERT INTO packages (collection, name, version)
         VALUES
         (1, 'react', '0'),
         (1, 'react-dom', '0');`
    );
  });

  describe('POST /api/packages', () => {
    it('return an object containing meta data relevant to packages', () => {
      let token =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbW9AZGVtby5jb20iLCJpYXQiOjE1ODkzNDA0NTcsInN1YiI6IjEifQ.KkhzaB4ipN6VnpwB6mgA8ywivXu9db2Po5bgvebq5n8';

      const replica = { collectionId: 1, name: 1 };

      return supertest(app)
        .post('/api/packages')
        .set('Authorization', token)
        .send(replica)
        .expect(200);
    });
  });

  describe('DELETE /api/packages', () => {
    it('responds with status 204 on successful delete', () => {
      return supertest(app)
        .delete('/api/packages/1')
        .set('Authorization', token)
        .expect(204);
    });
  });
});
