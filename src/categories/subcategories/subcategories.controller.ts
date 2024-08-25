import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto, CreateSubcategoryScheme } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { ZodValidationPipe } from 'src/pipes/ZodValidationPipe';

@ApiTags("Sub Categories")
@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Post()
  // Agregar el body de CreateSubcategoryDto
  // Agregar una pipe para convertir los datos de CreateSubcategoryDto a Prisma.SubcategoryUncheckedCreateInput
  @UsePipes(new ZodValidationPipe(CreateSubcategoryScheme))
  create(@Body() data: Prisma.SubCategoryUncheckedCreateInput) {
    return this.subcategoriesService.create(data);
  }

  @Get()
  findAll(
    @Query("page", new DefaultValuePipe(1), new ParseIntPipe({ optional : true })) page : number
  ) {
    return this.subcategoriesService.findAll({ page });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subcategoriesService.findOne(+id);
  }

  @Patch(':id')
  // Agregar el dto al body
  // Agregar una pipe para convertir los datos de subcategoria 
  update(@Param('id') id: string, @Body() updateSubcategoryDto: UpdateSubcategoryDto) {
    return this.subcategoriesService.update(+id, updateSubcategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subcategoriesService.remove(+id);
  }
}
