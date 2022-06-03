import { User } from '../db/models/user.model';
import { userMocks } from './mocks/user.mocks';
import request from 'supertest';
import { server } from '../index';
import { USER_CREATED } from '../shared/success-messages';
import {
  INVALID_EMAIL_ERROR,
  INVALID_PASSWORD_ERROR,
  USER_ALREADY_EXISTS_ERROR,
} from '../shared/errors/error-messages';
import { closeConnection, setupConnection } from './test-helpers';

describe('POST /register', () => {
  beforeAll(async () => {
    await setupConnection();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await closeConnection();
  });

  it('Users should be able to register through http requests', async () => {
    const response = await request(server).post('/api/register').send(userMocks.user);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe(USER_CREATED);
    const users = await User.find({});
    expect(users.length).toBe(1);
  });

  it('Password should be hashed before saving to the database', async () => {
    const response = await request(server).post('/api/register').send(userMocks.user);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe(USER_CREATED);
    const users = await User.find({});
    expect(users.length).toBe(1);
    expect(users[0].password).not.toBe(userMocks.password);
  });

  it('Users should not be able to register with an invalid email', async () => {
    const response = await request(server).post('/api/register').send({
      email: 'invalidEmail',
      password: userMocks.password,
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(INVALID_EMAIL_ERROR);
    const users = await User.find({});
    expect(users.length).toBe(0);
  });

  it('Users should not be able to register with an invalid password', async () => {
    const response = await request(server).post('/api/register').send({
      email: userMocks.email,
      password: 'short',
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(INVALID_PASSWORD_ERROR);
    const users = await User.find({});
    expect(users.length).toBe(0);
  });

  it('Users should not be able to register with an email that already exists', async () => {
    const user = new User(userMocks.user);
    await user.save();
    const response = await request(server).post('/api/register').send(userMocks.user);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(USER_ALREADY_EXISTS_ERROR);
    const users = await User.find({});
    expect(users.length).toBe(1);
  });
});
