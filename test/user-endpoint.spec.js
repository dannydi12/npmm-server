/* eslint-disable no-undef */
const knex = require('knex');
const assert = require('assert');
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

  describe('/api/users', () => {
    it('If a user succesfully signs up they are returned a bearer token and 200 status', () => {
      const newUserData = {
        email: 'dan@demo.com',
        password: 'demopassword',
      };

      return supertest(app)
        .post('/api/users')
        .send(newUserData)
        .expect(200)
        .then((res) => {
          assert.equal(Object.keys(res.body), 'authToken');
        });
    });
    it('If the request body comes in without an email or password a 400 status should be returned', () => {
      const newUserData = {
        email: 'dan@demo.com',
      };

      return supertest(app).post('/api/users').send(newUserData).expect(400);
    });
  });
});
