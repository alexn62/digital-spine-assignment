import request from 'supertest';
import { Product } from '../db/models/product.model';
import { clearDatabase } from './test-helpers';
import data from '../seeding/data.json';
import mongoose from 'mongoose';
import { server } from '..';
import { userMocks } from './mocks/user.mocks';
import { User } from '../db/models/user.model';
import { CART_UPDATE_SUCCESS } from '../shared/success-messages';
import { Cart } from '../db/models/cart.model';
describe('PATCH /addToCart', () => {
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

  it('Unauthorized users should not be able to add products to cart', async () => {
    const response = await request(server).patch('/api/addToCart/5e6f4a7a8d6c3d7b9e9a9c8a');
    expect(response.status).toBe(401);
  });

  it('Users should be able to add products to cart', async () => {
    const products = await Product.find({});
    const id = products[0]._id;
    const response = await request(server).patch(`/api/addToCart/${id}`).set('Cookie', session);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(CART_UPDATE_SUCCESS);
    const user = await User.findOne({ email: userMocks.user.email });
    const cart = await Cart.findOne({ _id: user._id });
    expect(cart.products.length).toBe(1);
  });

  it('Users should not be able to add products to cart twice', async () => {
    const products = await Product.find({});
    const id = products[0]._id;
    const response = await request(server).patch(`/api/addToCart/${id}`).set('Cookie', session);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(CART_UPDATE_SUCCESS);
    const user = await User.findOne({ email: userMocks.user.email });
    const cart = await Cart.findOne({ _id: user._id });
    expect(cart.products.length).toBe(2);
  });
});
