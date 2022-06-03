import { User } from '../db/models/user.model';
import { userMocks } from './mocks/user.mocks';
import request from 'supertest';
import { server } from '../index';
import { LOGGED_OUT } from '../shared/success-messages';
import mongoose from 'mongoose';
import { clearDatabase } from './test-helpers';

describe('DELETE /logout', () => {
  beforeAll(async () => {
    await clearDatabase();
    await request(server).post('/api/register').send(userMocks.user);
  });

  afterAll((done) => {
    mongoose.connection.close().then(() => {
      server.close();
      return done();
    });
  });

  it('User should be able to logout through http requests', async () => {
    const response = await request(server).delete('/api/logout');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(LOGGED_OUT);
    const users = await User.find({});
    expect(users.length).toBe(1);
  });

  it('Session cookie should be deleted', async () => {
    const prevSessions = await mongoose.connection.db.collection('sessions').find({}).toArray();
    console.log(prevSessions);
    const response = await request(server).delete('/api/logout');
    expect(response.status).toBe(200);
    expect(response.headers['set-cookie']).toBeUndefined();
  });
});
