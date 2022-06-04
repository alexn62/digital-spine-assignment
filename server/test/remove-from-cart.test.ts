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
describe('DELETE /removeFromCart', () => {
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

  it('Unauthorized users should not be able to remove products from cart', async () => {
    const product = await Product.findOne({});
    const id = product._id;
    const response = await request(server).delete(`/api/removeFromCart/${id}`);
    expect(response.status).toBe(401);
  });

  it('If product is not found, should return 404', async () => {
    const response = await request(server)
      .delete(`/api/removeFromCart/5e9d9d6f8f8e7e2a5b5c7b2f`)
      .set('Cookie', session);
    expect(response.status).toBe(404);
  });

  it('If cart is not found, should return 404', async () => {
    const product = await Product.findOne({});
    const id = product._id;
    const response = await request(server).delete(`/api/removeFromCart/${id}`).set('Cookie', session);
    expect(response.status).toBe(404);
  });

  it('If cart is found, should remove product from cart', async () => {
    const product = await Product.findOne({});
    const id = product._id;
    const user = await User.findOne({});
    const cart = new Cart({ _id: user._id, products: [id] });
    await cart.save();
    const response = await request(server).delete(`/api/removeFromCart/${id}`).set('Cookie', session);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(CART_UPDATE_SUCCESS);
    const cartAfter = await Cart.findOne({});
    expect(cartAfter.products.length).toBe(0);
  });

  it('If item is in cart twice, should remove only one', async () => {
    const product = await Product.findOne({});
    const id = product._id;
    const user = await User.findOne({});
    const cart = await Cart.findOne({ _id: user._id });
    cart.products.push(id);
    cart.products.push(id);
    await cart.save();
    const response = await request(server).delete(`/api/removeFromCart/${id}`).set('Cookie', session);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(CART_UPDATE_SUCCESS);
    const cartAfter = await Cart.findOne({});
    expect(cartAfter.products.length).toBe(1);
  });
});
