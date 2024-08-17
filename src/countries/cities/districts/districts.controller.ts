import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, Query, DefaultValuePipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { CreateDistrictDto, CreateDistrictScheme } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { ParseDistrictsPipe } from 'src/pipes/Countries/Cities/Districts/ParseDistrictsPipe';
import { ZodValidationPipe } from 'src/pipes/ZodValidationPipe';
import { RequiredRoles } from 'src/decorators/RequiredRoles';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.guard';
import { ROLE_TYPES } from 'src/types/ROLE_TYPES';

@ApiTags("Districts")
@Controller('countries/cities/districts')
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) {}

  @RequiredRoles([ROLE_TYPES.ADMIN])
  @ApiHeader({ name : "Authorization" })
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type : CreateDistrictDto })
  @UsePipes(new ZodValidationPipe(CreateDistrictScheme))
  @Post()
  async create(@Body(ParseDistrictsPipe) data: Prisma.DistrictCreateInput) {
    await this.districtsService.create(data);
  }

  @Get()
  async findAll(
    @Query("page", new DefaultValuePipe(1), new ParseIntPipe) page : number
  )
  {
    return this.districtsService.findAll({ page });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.districtsService.findOne(id);
  }

  @RequiredRoles([ROLE_TYPES.ADMIN])
  @ApiHeader({ name : "Authorization" })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDistrictDto: UpdateDistrictDto) {
    return this.districtsService.update(id, updateDistrictDto);
  }

  @RequiredRoles([ROLE_TYPES.ADMIN])
  @ApiHeader({ name : "Authorization" })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.districtsService.remove(id);
  }
}
