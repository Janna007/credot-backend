import request from 'supertest';
import { app } from '../../app.js'; 
import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server'

describe('User Authentication Tests', () => {
 
  let mongo 

  beforeAll(async ()=>{
    mongo= await MongoMemoryServer.create()
    const mongoUri= mongo.getUri()

    await mongoose.connect(mongoUri,{})

},10000)

beforeEach(async ()=>{
    const collections=await mongoose.connection.db.collections()

    for(let collection of collections){
        await collection.deleteMany({})
    }
})

afterAll(async ()=>{
    if(mongo){
        await mongo.stop();
    }
    await mongoose.connection.close()
})

  it('should return 200 on successful signup', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      .send({
        email: 'testuser@example.com',
        password: 'TestPassword123'
      });

    expect(response.status).toBe(201); 
    expect(response.body.message).toBe('User registered Successfully');
  },10000);

  it('should return 400 if email is missing', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      .send({
        password: 'TestPassword123'
      });

    expect(response.status).toBe(400);
   
  });

  it('should return 409 if user already exists', async () => {
    await request(app)
      .post('/api/v1/users/register')
      .send({
        email: 'testuser@example.com',
        password: 'TestPassword123'
      });

    const response = await request(app)
      .post('/api/v1/users/register')
      .send({
        email: 'testuser@example.com',
        password: 'TestPassword123'
      });

    expect(response.status).toBe(409);
    
  });
});


describe('User Authentication Tests', () => {
    beforeAll(() => {
        process.env.ACCESS_TOKEN_SECRET = 'jdnhbiuedhhh'; 
        process.env.ACCESS_TOKEN_EXPIRY="1d"
        process.env.REFRESH_TOKEN_SECRET="jsnfbjbafhc"
        process.env.REFRESH_TOKEN_EXPIRY="10d"

      });
    
      let mongo 
    
      beforeAll(async ()=>{
        mongo= await MongoMemoryServer.create()
        const mongoUri= mongo.getUri()
    
        await mongoose.connect(mongoUri,{})
    
    },10000)
    
    beforeEach(async ()=>{
        const collections=await mongoose.connection.db.collections()
    
        for(let collection of collections){
            await collection.deleteMany({})
        }
    })
    
    afterAll(async ()=>{
        if(mongo){
            await mongo.stop();
        }
        await mongoose.connection.close()
    })
  
    it('should return 200 on successful login', async () => {
      
      await request(app)
        .post('/api/v1/users/register')
        .send({
          email: 'wehin@gmail.com',
          password: 'wehin123'
        });
  
      const response = await request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'wehin@gmail.com',
          password: 'wehin123'
        });
  
      expect(response.status).toBe(200);
      
    });
  
    it('should return 400 if login credentials are missing', async () => {
      const response = await request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'loginuser@example.com'
        });
  
      expect(response.status).toBe(400);
    });
  
    it('should return 401 if password is incorrect', async () => {
      await request(app)
        .post('/api/v1/users/register')
        .send({
          email: 'ranna123@gmail.com',
          password: 'ranna123'
        });
  
      const response = await request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'ranna123@gmail.com',
          password: 'WrongPassword'
        });
  
      expect(response.status).toBe(401);
  
    });
  
    it('should return 404 if user does not exist', async () => {
      const response = await request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'nonexistentuser@example.com',
          password: 'SomePassword'
        });
  
      expect(response.status).toBe(404);
      
    });
  });
  