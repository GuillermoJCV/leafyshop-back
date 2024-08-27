import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, Query, DefaultValuePipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, CreateProductSchema } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'src/pipes/ZodValidationPipe';
import { Prisma } from '@prisma/client';
import { RequiredRoles } from 'src/decorators/RequiredRoles';
import { ROLE_TYPES } from 'src/types/ROLE_TYPES';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.guard';

@ApiTags("Products")
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @RequiredRoles([ROLE_TYPES.ADMIN, ROLE_TYPES.SELLER])
  @ApiHeader({ name : "Authorization" })
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type : CreateProductDto })
  @UsePipes(new ZodValidationPipe(CreateProductSchema))
  create(@Body() data : Prisma.ProductUncheckedCreateInput) {
    return this.productsService.create(data);
  }

  @Get()
  findAll(
    @Query("page", new DefaultValuePipe(1), new ParseIntPipe({ optional : true })) page : number
  )
  {
    return this.productsService.findAll({ page });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @RequiredRoles([ROLE_TYPES.ADMIN, ROLE_TYPES.SELLER])
  @ApiHeader({ name : "Authorization" })
  @UseGuards(JwtAuthGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
