import { clearDatabase } from './test-helpers';
import request from 'supertest';
import { Product } from '../db/models/product.model';
import { server } from '..';
import data from '../seeding/data.json';
import { userMocks } from './mocks/user.mocks';
import mongoose from 'mongoose';
import { Cart } from '../db/models/cart.model';
describe('POST /checkout', () => {
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
            Product.findOne({}).then((product: any) => {
              request(server)
                .patch(`/api/addToCart/${product.id}`)
                .set('Cookie', session)
                .then((_) => {
                  return done();
                });
            });
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

  it('Unauthorized users should not be able to checkout', async () => {
    const response = await request(server).post(`/api/checkout`).send({ status: 'success' });
    expect(response.status).toBe(401);
  });

  it('Authorized users should be able to checkout', async () => {
    const response = await request(server).post(`/api/checkout`).set('Cookie', session).send({ status: 'success' });
    expect(response.status).toBe(200);
    expect(response.body.order).toHaveProperty('products');
    expect(response.body.order).toHaveProperty('status');
    expect(response.body.order).toHaveProperty('user');
    expect(response.body.order.products).toHaveLength(1);
    expect(response.body.order.products[0]).toHaveProperty('product');
    expect(response.body.order.products[0]).toHaveProperty('quantity');
    const cart = await Cart.findOne({ sessionId });
    expect(cart.products).toHaveLength(0);
  });
});
