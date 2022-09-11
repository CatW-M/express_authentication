const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server');
const db = require('../models');

before(function(done) { //syncing database with app
  db.sequelize.sync({ force: true }).then(function() {
    done();
  });
});
//start tests 
describe('Auth Controller', function() {
  describe('GET /auth/signup', function() { //test get route
    it('should return a 200 response', function(done) { //actual test
      request(app).get('/auth/signup').expect(200, done);//test will try to access route
    });
  });

  describe('POST /auth/signup', function() { //testing a post
    it('should redirect to / on success', function(done) { //sign a user up
      request(app).post('/auth/signup')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        email: 'test@butts.co',
        name: 'Mike Schull',
        password: '123123123'
      })
      .expect('Location', '/')
      .expect(302, done);
    });

    it('should redirect to /auth/signup on failure', function(done) { //test for failed post route
      request(app).post('/auth/signup')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        email: 'new',
        name: 'Brian',
        password: 'p'
      })
      .expect('Location', '/auth/signup')
      .expect(302, done);
    });
  });

  describe('GET /auth/login', function() {
    it('should return a 200 response', function(done) {
      request(app).get('/auth/login')
      .expect(200, done);
    });
  });

  describe('POST /auth/login', function() {
    it('should redirect to / on success', function(done) {
      request(app).post('/auth/login')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        email: 'test@butts.co',
        password: '123123123'
      })
      .expect('Location', '/')
      .expect(302, done);
    });

    it('should redirect to /auth/login on failure', function(done) {
      request(app).post('/auth/login')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        email: 'new@new.co',
        password: 'p'
      })
      .expect(`Location`, '/auth/login')
      .expect(302, done);
    });
  });

  describe('GET /auth/logout', function() {
    it('should redirect to /', function(done) {
      request(app).get('/auth/logout')
      .expect('Location', '/')
      .expect(302, done);
    });
  });
});
//end tests