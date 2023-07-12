import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../../src/app.module';

import { ProductData, ProductData2 } from 'test/mocks/product.sample';
import {
  rootMongooseTestModule,
  closeMongoConnection,
} from 'test/utils/mongo/mongooseTestModule';

describe('Product Test', () => {
  let app: INestApplication;
  let httpServer: any;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    httpServer = app.getHttpServer();
  });

  it('Should be able to create product', async () => {
    const { body } = await request(httpServer)
      .post('/product')
      .send(ProductData)
      .expect(201);

    expect(body.name).toBe('Product Name');
    expect(body.variants.length).toBe(2);
  });

  it('Should be able to read product by id', async () => {
    const { body } = await request(httpServer)
      .post('/product')
      .send(ProductData)
      .expect(201);
    const productId = body._id;
    const { body: response } = await request(httpServer).get(
      `/product/${productId}`,
    );
    expect(response.name).toBe('Product Name');
    expect(response.variants.length).toBe(2);
  });

  it('Should be able to read products', async () => {
    await request(httpServer).post('/product').send(ProductData).expect(201);

    await request(httpServer).post('/product').send(ProductData2).expect(201);

    const { body } = await request(httpServer).get('/product?search=');
    expect(body.length).toBe(2);
  });

  it('Should be able to update product', async () => {
    const { body } = await request(httpServer)
      .post('/product')
      .send(ProductData)
      .expect(201);

    await request(httpServer)
      .patch(`/product/${body._id}`)
      .send({
        name: 'new product name',
      })
      .expect(200);

    const { body: response } = await request(httpServer).get(
      `/product/${body._id}`,
    );
    expect(response.name).toBe('new product name');
  });

  it('Should be able to delete product', async () => {
    await request(httpServer).post('/product').send(ProductData).expect(201);

    const { body: product2 } = await request(httpServer)
      .post('/product')
      .send(ProductData2)
      .expect(201);

    await request(httpServer).delete(`/product/${product2._id}`).expect(200);

    const { body: response } = await request(httpServer).get(
      `/product?search=`,
    );
    expect(response.length).toBe(1);
  });

  afterEach(async () => {
    await closeMongoConnection();
  });
});
