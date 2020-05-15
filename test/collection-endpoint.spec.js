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

  //before create base collection . find a collection on a post . send in a collection
  //underneath base user

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

    //get collections test

    before('create base collection', () => {
      return db.raw(
        `INSERT INTO collections (user_id, collection_name, is_launchpad)
      VALUES
      (1, 'React Front', false);`
      );
    });

    it('Get packages from a certain collection return 200', () => {
      let token =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbW9AZGVtby5jb20iLCJpYXQiOjE1ODkzNDA0NTcsInN1YiI6IjEifQ.KkhzaB4ipN6VnpwB6mgA8ywivXu9db2Po5bgvebq5n8';

      return supertest(app)
        .get('/api/collections')
        .query({ collectionId: '1' })
        .set('Authorization', token)
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body).to.be({ collectionId: '1' });
        });
    });

    // delete collections test

    before('create base collection', () => {
      return db.raw(
        `INSERT INTO collections (user_id, collection_name, is_launchpad)
      VALUES
      (1, 'Deletion Test', false);`
      );
    });

    it('Deletes a package sends 204 response', () => {
      let token =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbW9AZGVtby5jb20iLCJpYXQiOjE1ODkzNDA0NTcsInN1YiI6IjEifQ.KkhzaB4ipN6VnpwB6mgA8ywivXu9db2Po5bgvebq5n8';

      // const testData = {
      //   name: 'testcollectionMATT',
      //   isLaunchPad: false,
      // };

      return (
        supertest(app)
          .post('/api/collections')
          .query({ collectionId: '1' })
          .set('Authorization', token)
          .expect(204)
          .expect('Content-Type', /json/)
          // if {{collectionId} = 1} Can I write an if statement here checking against id = 1 only then delete
          .deleteCollection(req.app.get('db'), { collectionId: 1 })
      );
    });
  });
});
