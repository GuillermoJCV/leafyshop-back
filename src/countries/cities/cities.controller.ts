import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, DefaultValuePipe, UsePipes } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto, CreateCitySchema } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { ParseCitiesPipe } from 'src/pipes/Countries/Cities/ParseCitiesPipe';
import { ZodValidationPipe } from 'src/pipes/ZodValidationPipe';

@ApiTags("Cities")
@Controller('countries/cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @ApiBody({ type : CreateCityDto })
  @UsePipes(new ZodValidationPipe(CreateCitySchema))
  @Post()
  create(@Body(ParseCitiesPipe) city: Prisma.CityCreateInput) {
    return this.citiesService.create(city);
  }

  @Get()
  findAll(
    @Query(new DefaultValuePipe(1), new ParseIntPipe({optional : true})) page : number
  )
  {
    return this.citiesService.findAll({ page });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number)
  {
    return this.citiesService.findOne(id);
  }

  @ApiBody({ type : UpdateCityDto })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCityDto: Prisma.CityUpdateInput)
  {
    return this.citiesService.update(id, updateCityDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number)
  {
    return this.citiesService.remove(id);
  }
}
