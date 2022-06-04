import { clearDatabase } from './test-helpers';
import request from 'supertest';
import { Product } from '../db/models/product.model';
import { server } from '..';
import data from '../seeding/data.json';
import { userMocks } from './mocks/user.mocks';
import mongoose from 'mongoose';
import { User } from '../db/models/user.model';
import { Cart } from '../db/models/cart.model';
describe('GET /cart', () => {
  let session: string;
  beforeAll((done) => {
    clearDatabase().then(() => {
      Product.insertMany(data.products).then(() => {
        request(server)
          .post('/api/register')
          .send(userMocks.user)
          .then((response) => {
            session = response.headers['set-cookie'][0];
            return done();
          });
      });
    });
  });
  afterAll((done) => {
    mongoose.connection.close().then(() => {
      server.close();
      return done();
    });
  });

  it('Unauthorized users should not be able to get cart', async () => {
    const product = await Product.findOne({});
    const user = await User.findOne({});
    const id = product._id;
    const cart = new Cart({ _id: user._id, products: [id] });
    await cart.save();
    const response = await request(server).get(`/api/cart`);
    expect(response.status).toBe(401);
  });

  it('If cart is not found, should return 404', async () => {
    await Cart.deleteMany();
    const response = await request(server).get(`/api/cart`).set('Cookie', session);
    expect(response.status).toBe(404);
  });

  it('If cart is found, should return cart', async () => {
    const user = await User.findOne({});
    const product = await Product.findOne({});
    const id = product._id;
    const cart = new Cart({ _id: user._id, products: [id] });
    await cart.save();
    const response = await request(server).get(`/api/cart`).set('Cookie', session);
    expect(response.status).toBe(200);
    expect(response.body.products.length).toBe(1);
    console.log(response.body);
  });
});
