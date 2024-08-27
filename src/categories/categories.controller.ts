import { Controller, Get, Post, Body, Put, Param, Delete, Query, DefaultValuePipe, ParseIntPipe, UsePipes, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, CreateCategoryScheme } from './dto/create-category.dto';
import { UpdateCategoryDto, UpdateCategoryScheme } from './dto/update-category.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/pipes/ZodValidationPipe';
import { RequiredRoles } from 'src/decorators/RequiredRoles';
import { ROLE_TYPES } from 'src/types/ROLE_TYPES';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.guard';

@ApiTags("Categories")
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @RequiredRoles([ROLE_TYPES.ADMIN])
  @ApiHeader({ name : "Authorization" })
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(CreateCategoryScheme))
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll(
    @Query("page", new DefaultValuePipe(1), new ParseIntPipe({ optional : true })) page : number
  )
  {
    return this.categoriesService.findAll({ page });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Put(':id')
  @RequiredRoles([ROLE_TYPES.ADMIN])
  @ApiHeader({ name : "Authorization" })
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(UpdateCategoryScheme))
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
