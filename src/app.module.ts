import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './modules/user.module';
import { UserMiddleware } from './user.middleware';
import { CategoryModule } from './modules/category.module';
import { CategoryController } from './controllers/category.controller';

@Module({
  imports: [UserModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(CategoryController);
  }
}
