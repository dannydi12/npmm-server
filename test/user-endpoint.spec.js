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

  describe('/api/users', () => {
    it('If a user succesfully signs up they are returned a bearer token and 200 status', () => {
      const newUserData = {
        email: 'dan@demo.com',
        password: 'demopassword',
      };

      return supertest(app)
        .post('/api/users')
        .send(newUserData)
        .expect((res) => {
          expect(res.body['authToken']);
        })
        .expect(200);
    });
  });
});
