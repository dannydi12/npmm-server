const knex = require('knex');
const app = require('../src/app');

describe('user registration', () => {
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

  before('create base user', () => {
    return db.raw(
      `INSERT INTO users (email, password)
       VALUES
       ('demo@demo.com', '$2a$04$DjkbEZXF5djK5j/wgpjBY.vqOxiqvUk5tXUSlvwQIv0sOOmmFV/O6');`
    );
  });

  describe('/api/collections', () => {
    it('A successful get call should return all users collections and a status 200', () => {
      let token =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbW9AZGVtby5jb20iLCJpYXQiOjE1ODkzNDA0NTcsInN1YiI6IjEifQ.KkhzaB4ipN6VnpwB6mgA8ywivXu9db2Po5bgvebq5n8';

      const goodLoginData = {
        email: 'demo@demo.com',
        password: 'demopassword',
      };

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
        isLaunchPad: false,
      };

      return supertest(app)
        .post('/api/collections')
        .set('Authorization', token)
        .send(testData)
        .expect((res) => {
          res.body.id = 1;
          res.body.user_id = 1;
          res.body.collection_name = 'testcollectionMATT';
          res.body.isLaunchPad = false;
        })
        .expect(201);
    });
  });
});
