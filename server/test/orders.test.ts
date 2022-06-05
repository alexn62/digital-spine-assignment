import { Product } from '../db/models/product.model';
import { clearDatabase } from './test-helpers';
import data from '../seeding/data.json';
import request from 'supertest';
import { server } from '..';
import { userMocks } from './mocks/user.mocks';
import mongoose from 'mongoose';
import { Order } from '../db/models/order.model';
describe('GET /orders', () => {
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
                  request(server)
                    .post(`/api/checkout`)
                    .set('Cookie', session)
                    .send({ status: 'success' })
                    .then(() => {
                      return done();
                    });
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

  it('Unauthorized users should not be able to get orders', async () => {
    const response = await request(server).get('/api/orders');
    expect(response.status).toBe(401);
  });

  it('Authorized users should be able to get orders', async () => {
    const response = await request(server).get('/api/orders').set('Cookie', session);
    expect(response.status).toBe(200);
    expect(response.body.orders).toHaveLength(1);
    expect(response.body.orders[0]).toHaveProperty('products');
    expect(response.body.orders[0]).toHaveProperty('status');
    expect(response.body.orders[0]).toHaveProperty('user');
    expect(response.body.orders[0].products).toHaveLength(1);
    expect(response.body.orders[0].products[0]).toHaveProperty('product');
    expect(response.body.orders[0].products[0]).toHaveProperty('quantity');
  });

  it('Should not be able to get cancelled orders', async () => {
    const product = await Product.findOne({});
    await request(server).patch(`/api/addToCart/${product.id}`).set('Cookie', session);
    await request(server).post(`/api/checkout`).set('Cookie', session).send({ status: 'cancelled' });
    const response = await request(server).get('/api/orders').set('Cookie', session);
    expect(response.status).toBe(200);
    expect(response.body.orders).toHaveLength(1);
    expect(response.body.orders[0]).toHaveProperty('products');
    expect(response.body.orders[0]).toHaveProperty('status');
    expect(response.body.orders[0]).toHaveProperty('user');
    expect(response.body.orders[0].products).toHaveLength(1);
    expect(response.body.orders[0].products[0]).toHaveProperty('product');
    expect(response.body.orders[0].products[0]).toHaveProperty('quantity');
    const orders = await Order.find({});
    expect(orders).toHaveLength(2);
    const statuses = response.body.orders.map((order: any) => order.status);
    expect(statuses).toEqual(['success']);
  });
});
