import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CategortBodyInterface } from 'src/interfaces/category.interface';
import { User } from 'src/repositories/user.entity';
import { CategoryService } from 'src/services/category.service';

@Controller('/categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get()
  findAll() {
    return 'all categories';
  }

  @Post()
  async createCat(
    @Body() category: CategortBodyInterface,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    const user: User = JSON.parse(request.headers.cookie);

    const savedCategory = await this.categoryService.createCategory(
      user,
      category,
    );

    delete savedCategory.user;

    return response.status(HttpStatus.CREATED).send({
      ...savedCategory,
      userId: user.id,
    });
  }
}
