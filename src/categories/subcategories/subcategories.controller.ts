import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto, CreateSubcategoryScheme } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto, UpdateSubcategoryScheme } from './dto/update-subcategory.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { ZodValidationPipe } from 'src/pipes/ZodValidationPipe';
import { ParseSubCategoryCreatePipe } from 'src/pipes/Categories/SubCategories/ParseSubCategoryCreatePipe';
import { ParseSubcategoryUpdatePipe } from 'src/pipes/Categories/SubCategories/ParseSubCategoryUpdatePipe';

@ApiTags("Sub Categories")
@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Post()
  @ApiBody({ type : CreateSubcategoryDto })
  @UsePipes(new ZodValidationPipe(CreateSubcategoryScheme))
  create(@Body(ParseSubCategoryCreatePipe) data: Prisma.SubCategoryUncheckedCreateInput) {
    return this.subcategoriesService.create(data);
  }

  @Get()
  findAll(
    @Query("page", new DefaultValuePipe(1), new ParseIntPipe({ optional : true })) page : number
  ) {
    return this.subcategoriesService.findAll({ page });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.subcategoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type : UpdateSubcategoryDto })
  @UsePipes(new ZodValidationPipe(UpdateSubcategoryScheme))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ParseSubcategoryUpdatePipe) data: Prisma.SubCategoryUncheckedUpdateInput)
  {
    return this.subcategoriesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.subcategoriesService.remove(id);
  }
}
