import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import supertest from 'supertest';
import { MySqlContainer, StartedMySqlContainer } from '@testcontainers/mysql';
import { TestDatabaseService } from '../../services/test-database.service';
import { EntityTestService } from '../../services/entity/entity-test.service';
import { ProductTestService } from '../../services/entity/product-test.service';
import { UserTestService } from '../../services/entity/user-test.service';

let container: StartedMySqlContainer;
let app: INestApplication;
let testingModule: TestingModule; // renamed
let testDatabaseService: TestDatabaseService;
let testService: EntityTestService;

beforeAll(async () => {
  jest.setTimeout(60000);

  container = await new MySqlContainer('mysql:8.0.33')
    .withDatabase('test_db')
    .withUsername('root')
    .withRootPassword('root')
    .start();

  testingModule = await Test.createTestingModule({
    providers: [
      TestDatabaseService,
      UserTestService,
      ProductTestService,
      EntityTestService,
      {
        provide: DataSource,
        useFactory: async () => {
          const ds = new DataSource({
            type: 'mysql',
            host: container.getHost(),
            port: container.getMappedPort(3306),
            username: 'root',
            password: 'root',
            database: 'test_db',
            synchronize: true,
          });
          await ds.initialize();
          return ds;
        },
      },
    ],
  }).compile();

  testDatabaseService = testingModule.get(TestDatabaseService);
  testService = testingModule.get(EntityTestService);

  app = testingModule.createNestApplication();
  await app.init();
});

afterAll(async () => {
  if (testDatabaseService) await testDatabaseService.closeDatabaseConnection();
  if (app) await app.close();
  if (container) await container.stop();
});

beforeEach(async () => {
  await testDatabaseService.cleanDatabase();
});

describe('/product', () => {
  it('should create and fetch a product', async () => {
    const user = await testService.user.create();
    const product = await testService.product.createItem({ userId: user.id });

    const response = await supertest(app.getHttpServer())
      .get(`/product/${product.id}`)
      .auth(user.id.toString(), { type: 'bearer' })
      .expect(200);

    expect(response.body.id).toBe(product.id);
    expect(response.body.title).toBe(product.title);
  });
});
