import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';
import { UserTestService } from './services/entity/user-test.service';
import { EntityTestService } from './services/entity/entity-test.service';
import { TestDatabaseService } from './services/test-database.service';
import { ProductTestService } from './services/entity/product-test.service';

export const getMainModule = async (p0: { type: string; host: any; port: any; username: string; password: string; database: string; synchronize: boolean; }): Promise<TestingModule> => {
  return Test.createTestingModule({
    imports: [AppModule],
    providers: [
      TestDatabaseService,
      UserTestService,
      ProductTestService,
      EntityTestService,
    ],
  })
    .compile();
};
