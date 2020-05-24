const knex = require('knex');
const assert = require('assert');
const app = require('../src/app');

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

  before('cleanup', () => db.raw(
    `TRUNCATE
      users
      RESTART IDENTITY CASCADE;
    
    TRUNCATE  
      collections
      RESTART IDENTITY CASCADE;
    
    TRUNCATE
      packages
      RESTART IDENTITY CASCADE;`,
  ));

  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbW9AZGVtby5jb20iLCJpYXQiOjE1ODkzNDA0NTcsInN1YiI6IjEifQ.KkhzaB4ipN6VnpwB6mgA8ywivXu9db2Po5bgvebq5n8';

  before('create base user', () => db.raw(
    `INSERT INTO users (email, password)
       VALUES
       ('demo@demo.com', '$2a$04$DjkbEZXF5djK5j/wgpjBY.vqOxiqvUk5tXUSlvwQIv0sOOmmFV/O6');`,
  ));

  before('create a collection', () => db.raw(
    `INSERT INTO collections (user_id, collection_name)
         VALUES
         (1, 'test');`,
  ));

  before('populate collection', () => db.raw(
    `INSERT INTO packages (collection, name, version)
         VALUES
         (1, 'react', '0'),
         (1, 'react-dom', '0');`,
  ));

  describe('POST /api/packages', () => {
    it('return an object containing meta data relevant to packages', () => {
      const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbW9AZGVtby5jb20iLCJpYXQiOjE1ODkzNDA0NTcsInN1YiI6IjEifQ.KkhzaB4ipN6VnpwB6mgA8ywivXu9db2Po5bgvebq5n8';

      const replica = { collectionId: 1, name: 'Test Package' };

      return supertest(app)
        .post('/api/packages')
        .set('Authorization', token)
        .send(replica)
        .expect((res) => assert.deepEqual(res.body, {
          id: 3,
          collection: 1,
          name: 'Test Package',
          version: null,
        }))
        .expect(200);
    });
    it('returns 400 when the collectionId is not a number', () => {
      const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbW9AZGVtby5jb20iLCJpYXQiOjE1ODkzNDA0NTcsInN1YiI6IjEifQ.KkhzaB4ipN6VnpwB6mgA8ywivXu9db2Po5bgvebq5n8';

      const badData = { collectionId: 'hey', name: 'Test Package' };

      return supertest(app)
        .post('/api/packages')
        .set('Authorization', token)
        .send(badData)
        .expect(400);
    });
    it('returns 400 when missing either name or collectionId from the request body', () => {
      const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbW9AZGVtby5jb20iLCJpYXQiOjE1ODkzNDA0NTcsInN1YiI6IjEifQ.KkhzaB4ipN6VnpwB6mgA8ywivXu9db2Po5bgvebq5n8';

      const badData = { collectionId: 1 };

      return supertest(app)
        .post('/api/packages')
        .set('Authorization', token)
        .send(badData)
        .expect(400);
    });
    it('returns 400 when attempting to add a pre-existing package', () => {
      const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbW9AZGVtby5jb20iLCJpYXQiOjE1ODkzNDA0NTcsInN1YiI6IjEifQ.KkhzaB4ipN6VnpwB6mgA8ywivXu9db2Po5bgvebq5n8';

      const badData = { collectionId: 1, name: 'react' };

      return supertest(app)
        .post('/api/packages')
        .set('Authorization', token)
        .send(badData)
        .expect(400);
    });
  });

  describe('DELETE /api/packages', () => {
    it('responds with status 204 on successful delete', () => supertest(app)
      .delete('/api/packages/1')
      .set('Authorization', token)
      .expect(204));
    it('responds with status 400 if the request params contain a non numeric id', () => supertest(app)
      .delete('/api/packages/hey')
      .set('Authorization', token)
      .expect(400));
  });
});
