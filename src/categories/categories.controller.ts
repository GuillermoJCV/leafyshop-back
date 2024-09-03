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
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll(
    @Query("page", new DefaultValuePipe(1), new ParseIntPipe({ optional : true })) page : number
  )
  {
    return await this.categoriesService.findAll({ page });
  }

  @Get(':param')
  async findOne(@Param('param') param: string) {

    if(+param) return await this.categoriesService.findById(Number.parseInt(param));
    else return await this.categoriesService.findByName(param)
    
  }

  @Put(':id')
  @RequiredRoles([ROLE_TYPES.ADMIN])
  @ApiHeader({ name : "Authorization" })
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(UpdateCategoryScheme))
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto)
  {
    return await this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number)
  {
    return await this.categoriesService.remove(id);
  }
}
