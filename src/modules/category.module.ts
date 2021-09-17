import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { categoryProviders } from '../providers/category.provider';

import { CategoryService } from '../services/category.service';
import { CategoryController } from '../controllers/category.controller';

@Module({
  controllers: [CategoryController],
  imports: [DatabaseModule],
  providers: [...categoryProviders, CategoryService],
})
export class CategoryModule {}
