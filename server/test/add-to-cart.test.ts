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
  let sessionId: string;
  beforeAll((done) => {
    clearDatabase().then(() => {
      Product.insertMany(data.products).then(() => {
        request(server)
          .post('/api/register')
          .send(userMocks.user)
          .then((response) => {
            session = response.headers['set-cookie'][0];
            sessionId = session.split('s%3A')[1].split('.')[0];
            console.log('sessionid', sessionId);
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

  it('Users should be able to add products to cart', async () => {
    const products = await Product.find({});
    const id = products[0]._id;
    const response = await request(server).patch(`/api/addToCart/${id}`).set('Cookie', session);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(CART_UPDATE_SUCCESS);
    const allCarts = await Cart.find({});
    const cart = await Cart.findOne({ sessionId: sessionId });
    expect(cart.products.length).toBe(1);
  });

  it('Users should be able to add products to cart twice', async () => {
    const products = await Product.find({});
    const id = products[0]._id;
    const response = await request(server).patch(`/api/addToCart/${id}`).set('Cookie', session);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(CART_UPDATE_SUCCESS);
    const user = await User.findOne({ email: userMocks.user.email });
    const cart = await Cart.findOne({ sessionId: sessionId });
    expect(cart.products.length).toBe(2);
  });
});
