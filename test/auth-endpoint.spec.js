const knex = require('knex');
const assert = require('assert');
const app = require('../src/app');

describe('Auth login', () => {
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

  describe('/api/auth/login', () => {
    it('With valid credentials, logs a user in and returns a bearer token', () => {
      const goodLoginData = {
        email: 'demo@demo.com',
        password: 'demopassword',
      };

      return supertest(app)
        .post('/api/auth/login')
        .send(goodLoginData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });

    it('When missing either the email or password it returns a 400', () => {
      const incompleteLoginData = {
        email: 'demo@demo.com',
      };
      return supertest(app)
        .post('/api/auth/login')
        .send(incompleteLoginData)
        .expect(400);
    });

    it('Responds with a 400 when presented a bad email', () => {
      const badEmailData = {
        email: 'demoo@demo.com',
        password: 'demopassword',
      };
      return supertest(app)
        .post('/api/auth/login')
        .send(badEmailData)
        .expect(400);
    });

    it('Responds with a 400 when presented a bad password', () => {
      const badPassData = {
        email: 'demo@demo.com',
        password: 'demoDinga',
      };
      return supertest(app)
        .post('/api/auth/login')
        .send(badPassData)
        .expect(400);
    });
  });
});
