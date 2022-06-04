import mongoose from 'mongoose';
import { server } from '..';
import { clearDatabase } from './test-helpers';
import request from 'supertest';
import { Product } from '../db/models/product.model';
import data from '../seeding/data.json';
describe('GET /products', () => {
  beforeAll((done) => {
    clearDatabase().then(() => {
      Product.insertMany(data.products).then(() => {
        done();
      });
    });
  });
  afterAll((done) => {
    mongoose.connection.close().then(() => {
      server.close();
      return done();
    });
  });

  it('Users should be able to get all products through http requests', async () => {
    const response = await request(server).get('/api/products');
    expect(response.status).toBe(200);
    const products = await Product.find({});
    expect(products.map((product) => product._id.toString()).sort()).toEqual(
      response.body.map((product: any) => product._id.toString()).sort()
    );
  });

  it('Should be able to search for products by name', async () => {
    const response = await request(server).get('/api/products?title=reishu');
    expect(response.status).toBe(200);
    const products = await Product.find({ title: /reishu/i });
    expect(products.length).toBe(response.body.length);
  });

  it('Should be able to filter by tags', async () => {
    const response = await request(server).get('/api/products?tags=ram+memory');
    expect(response.status).toBe(200);
    const products = await Product.find({ tags: { $in: [new RegExp('ram', 'i'), new RegExp('memory', 'i')] } });
    expect(products.length).toBe(response.body.length);
  });

  it('Should be able to filter by category', async () => {
    const response = await request(server).get('/api/products?category=Storage%20%26%20Memory');
    expect(response.status).toBe(200);
    const products = await Product.find({ category: 'Storage & Memory' });
    expect(products.length).toBe(response.body.length);
  });

  it('Should be able to filter by availability', async () => {
    const response = await request(server).get('/api/products?available=true');
    expect(response.status).toBe(200);
    const products = await Product.find({ available: true });
    expect(products.length).toBe(response.body.length);
  });

  it('Should be able to filter by best seller', async () => {
    const response = await request(server).get('/api/products?is_best_seller=true');
    expect(response.status).toBe(200);
    const products = await Product.find({ is_best_seller: true });
    expect(products.length).toBe(response.body.length);
  });

  it('Should be able to filter by brand', async () => {
    const response = await request(server).get('/api/products?brand=Apple');
    expect(response.status).toBe(200);
    const products = await Product.find({ brand: 'Apple' });
    expect(products.length).toBe(response.body.length);
  });

  it('Should be able to sort by price ascending', async () => {
    const response = await request(server).get('/api/products?sortBy=price+asc');
    expect(response.status).toBe(200);
    const resPrices = response.body.map((product: any) => product.price.value);
    const products = await Product.find({});
    const prodPrices = products.map((product: any) => product.price.value).sort((a: number, b: number) => a - b);
    expect(resPrices).toEqual(prodPrices);
  });

  it('Should be able to sort by price descending', async () => {
    const response = await request(server).get('/api/products?sortBy=price+desc');
    expect(response.status).toBe(200);
    const resPrices = response.body.map((product: any) => product.price.value);
    const products = await Product.find({});
    const prodPrices = products.map((product: any) => product.price.value).sort((a: number, b: number) => b - a);
    expect(resPrices).toEqual(prodPrices);
  });

  it('Should be able to get single product', async () => {
    const product = await Product.findOne({});
    const response = await request(server).get(`/api/products/${product._id}`);
    expect(response.status).toBe(200);
  });

  it('Should return 404 if product not found', async () => {
    const response = await request(server).get('/api/products/5f0c9d9b8e8f0f1f7e8c3a3d');
    expect(response.status).toBe(404);
  });
});
