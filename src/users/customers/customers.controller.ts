import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UsePipes, DefaultValuePipe, Query, Optional, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto, CreateCustomerScheme } from './dto/create-customer.dto';
import { UpdateCustomerDto, UpdateCustomerScheme } from './dto/update-customer.dto';
import { ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { ParseCustomerPipe } from 'src/pipes/Users/Customers/ParseCustomerPipe';
import { ZodValidationPipe } from 'src/pipes/ZodValidationPipe';
import { ROLE_TYPES } from 'src/types/ROLE_TYPES';
import { RequiredRoles } from 'src/decorators/RequiredRoles';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags("Customers")
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiBody({ type : CreateCustomerDto })
  @RequiredRoles([ROLE_TYPES.ADMIN])
  @ApiHeader({ name : "Authorization" })
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(CreateCustomerScheme))
  @Post()
  async create(@Body(ParseCustomerPipe) data: Prisma.CustomerUncheckedCreateInput) {
    return await this.customersService.create(data);
  }

  @Get()
  async findAll(
      @Query("page", new DefaultValuePipe(1), new ParseIntPipe({ optional : true })) page : number
  ) 
  {
    return await this.customersService.findAll({ page });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.customersService.findOne(id);
  }

  @ApiBody({ type : UpdateCustomerDto })
  @RequiredRoles([ROLE_TYPES.ADMIN])
  @ApiHeader({ name : "Authorization" })
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(UpdateCustomerScheme))
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCustomerDto: UpdateCustomerDto) {
    return await this.customersService.update(id, updateCustomerDto);
  }

  @RequiredRoles([ROLE_TYPES.ADMIN])
  @ApiHeader({ name : "Authorization" })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.customersService.remove(id);
  }
}
