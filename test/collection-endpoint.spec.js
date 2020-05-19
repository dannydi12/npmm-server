const knex = require('knex');
const app = require('../src/app');
const assert = require('assert');

describe('Collections-endpoint', () => {
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
      users,
      collections,
      packages
      RESTART IDENTITY CASCADE;`
    );
  });

  before('create base user', () => {
    return db.raw(
      `INSERT INTO users (email, password)
       VALUES
       ('demo@demo.com', '$2a$04$DjkbEZXF5djK5j/wgpjBY.vqOxiqvUk5tXUSlvwQIv0sOOmmFV/O6');`
    );
  });

  describe('/api/collections', () => {
    before('create collection', () => {
      return db.raw(
        `INSERT INTO collections (user_id, collection_name)
        VALUES
        (1, 'Test'),
        (1, 'Test v2');`
      );
    });
    it('A post sent to collection with a duplicate name should return a 400', () => {
      let token =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbW9AZGVtby5jb20iLCJpYXQiOjE1ODkzNDA0NTcsInN1YiI6IjEifQ.KkhzaB4ipN6VnpwB6mgA8ywivXu9db2Po5bgvebq5n8';

      const testData = { name: 'Test' };

      return supertest(app)
        .post('/api/collections')
        .set('Authorization', token)
        .send(testData)
        .expect(400);
    });
    it('A successful get call should return all users collections and a status 200', () => {
      let token =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbW9AZGVtby5jb20iLCJpYXQiOjE1ODkzNDA0NTcsInN1YiI6IjEifQ.KkhzaB4ipN6VnpwB6mgA8ywivXu9db2Po5bgvebq5n8';

      return supertest(app)
        .get('/api/collections')
        .set('Authorization', token)
        .expect(200);
    });

    it('A succesful post should return the newly created object and a status 201', () => {
      let token =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbW9AZGVtby5jb20iLCJpYXQiOjE1ODkzNDA0NTcsInN1YiI6IjEifQ.KkhzaB4ipN6VnpwB6mgA8ywivXu9db2Po5bgvebq5n8';

      const testData = {
        name: 'testcollectionMATT',
      };

      return supertest(app)
        .post('/api/collections')
        .set('Authorization', token)
        .send(testData)
        .expect((res) => {
          assert.equal(res.body.id, 3);
          assert.equal(res.body.user_id, 1);
          assert.equal(res.body.collection_name, 'testcollectionMATT');
        })
        .expect(201);
    });

    it('GET api/collection/:collectionid should return a specific collection', () => {
      let token =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbW9AZGVtby5jb20iLCJpYXQiOjE1ODkzNDA0NTcsInN1YiI6IjEifQ.KkhzaB4ipN6VnpwB6mgA8ywivXu9db2Po5bgvebq5n8';

      return supertest(app)
        .get('/api/collections/3')
        .set('Authorization', token)
        .expect((res) => {
          assert.equal(res.body.name, 'testcollectionMATT');
          assert.deepEqual(res.body, { name: 'testcollectionMATT', packs: [] });
        })
        .expect(200);
    });
  });

  it('PATCH api/collections/:collectionid responds with 200 and returns patched object', () => {
    let token =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbW9AZGVtby5jb20iLCJpYXQiOjE1ODkzNDA0NTcsInN1YiI6IjEifQ.KkhzaB4ipN6VnpwB6mgA8ywivXu9db2Po5bgvebq5n8';

    return supertest(app)
      .patch('/api/collections/1')
      .set('Authorization', token)
      .send({ name: 'updatedName' })
      .expect(200);
  });

  it('DELETE api/collections/:collectionid responds with 204', () => {
    let token =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbW9AZGVtby5jb20iLCJpYXQiOjE1ODkzNDA0NTcsInN1YiI6IjEifQ.KkhzaB4ipN6VnpwB6mgA8ywivXu9db2Po5bgvebq5n8';

    return supertest(app)
      .delete('/api/collections/1')
      .set('Authorization', token)
      .expect(204);
  });

  it('A post sent to collections without a name in the body should return a status 400', () => {
    let token =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbW9AZGVtby5jb20iLCJpYXQiOjE1ODkzNDA0NTcsInN1YiI6IjEifQ.KkhzaB4ipN6VnpwB6mgA8ywivXu9db2Po5bgvebq5n8';

    const testData = {};

    return supertest(app)
      .post('/api/collections')
      .set('Authorization', token)
      .send(testData)
      .expect(400);
  });
  it('A non integer collection id throws a 400 status', () => {
    let token =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbW9AZGVtby5jb20iLCJpYXQiOjE1ODkzNDA0NTcsInN1YiI6IjEifQ.KkhzaB4ipN6VnpwB6mgA8ywivXu9db2Po5bgvebq5n8';

    const testData = {};

    return supertest(app)
      .get('/api/collections/hey')
      .set('Authorization', token)
      .send(testData)
      .expect(400);
  });
  it('returns just the names when presented with query justNames', () => {
    let token =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbW9AZGVtby5jb20iLCJpYXQiOjE1ODkzNDA0NTcsInN1YiI6IjEifQ.KkhzaB4ipN6VnpwB6mgA8ywivXu9db2Po5bgvebq5n8';

    return supertest(app)
      .get('/api/collections/1?justNames=true')
      .set('Authorization', token)
      .expect(200);
  });
});
