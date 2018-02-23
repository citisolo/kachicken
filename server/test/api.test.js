var request = require('supertest');
var server = require('../server');
const assert = require('assert');


describe('GET /api/ingredient', function() {
  it('should render ok', function(done){
    request(server)
      .get('/api/ingredient')
      .expect(200)
      .end(done);
  })
})

describe('GET /api/ingredient/onion', function() {
  it('should render ok', function(done){
    request(server)
      .get('/api/ingredient/onion')
      .expect(200)
      .end((err, res) => {
        //assert(res.body[0].name, 'harvey');
        done();
      })
  })
})

describe('GET /api/recipe', function(){
  it('should render ok', function(done){
    request(server)
      .get('/api/recipe')
      .expect(200)
      .end(done)
  })
})

describe('POST /api/recipe', () => {
  it('should create recipe, return 201 the delete the recipe and return 204', (done)=>{
    request(server)
      .post('/api/recipe')
      .send({
        ingredients: "59dc639b4f68076df9b22fec",
        ingredients: "59e59068501a9d30c12b75d5",
        ingredients: "59e59076501a9d30c12b75d6",
        units: "kg",
        units: "kg",
        units: "kg",
        quatity: "0",
        quantity: "0",
        quantity: "0",
        name: "test rec",
        lifestyle: "any",
        mealtime:"dinner",
        serves:3,
        type: "caribean, international"
      })
     .expect(201)
     .then((response) => {
       request(server)
        .delete('/api/recipe/' + response.body._id)
        .expect(204, done)
     })
  } )
})

describe('GET /api/menu', function(){
  it('should render ok', function(done){
    request(server)
      .get('/api/menu')
      .expect(200)
      .end(done)
  })
})

describe('POST /api/menu', function(){
  it('should create menu return 201 the delete the menu and return 204', function(done){
    request(server)
      .post('/api/menu')
      .send({
        name: 'My test Menu'
      })
      .expect(201)
      .then((res) => {
        request(server)
          .delete('/api/menu/' + res.body._id )
          .expect(204, done)
      })
  })
})

describe('POST /api/user (register user)', () => {
  it('should create user, return 201 the delete the user and return 204', (done)=>{
    request(server)
      .post('/api/user')
      .send({
        email: "xolocinco@mansamusa.com",
        username: "xolocinco",
        password: "dogsmarts",
        passwordConf:"dogsmarts",
      })
     .expect(201)
     .then((response) => {
       request(server)
        .delete('/api/user/' + response.body._id)
        .set('x-access-token', response.body.token)
        .expect(204, done)
     })
  } )

  describe('POST /api/user (authenticate user)', () => {
    it('should attempt to log in with incorrect password and return 401', (done)=>{
      request(server)
        .post('/api/user')
        .send({
          email: "xolocinco@mansamusa.com",
          username: "xolocinco",
          password: "dogsmarts",
          passwordConf:"dogsmarts",
        })
       .expect(201)
       .then((response) => {
         var token = response.body.token;
         var id = response.body._id;
         request(server)
          .post('/api/user/')
          .send({
               'token': token,
               'logemail' : "xolocinco@mansamusa.com",
               'logpassword': "dogsmrts"
                 })
          .expect(401)
          .then((response) => {
            request(server)
             .delete('/api/user/' + id)
             .set('x-access-token', token)
             .expect(204, done)
          })
       })
     })
    })

})
