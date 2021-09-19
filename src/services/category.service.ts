import { Injectable, Inject } from '@nestjs/common';
import { CategortBodyInterface } from 'src/interfaces/category.interface';
import { Category } from 'src/repositories/category.entity';
import { User } from 'src/repositories/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>,
  ) {}
  async createCategory(user: User, category: CategortBodyInterface) {
    const newCategory = new Category();
    newCategory.user = user;
    newCategory.name = category.name;
    newCategory.color = category.color;
    const savedCat = await this.categoryRepository.save(newCategory);

    return savedCat;
  }
}
