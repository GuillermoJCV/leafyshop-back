import { Body, Controller, Get, Post, Param, ParseIntPipe, Query, Put, Delete, UsePipes, DefaultValuePipe, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CountriesService } from './countries.service';
import { CreateCountryDto, CreateCountrySchema } from './dto/create-country.dto';
import { UpdateCountryDto, UpdateCountrySchema } from './dto/update-country.dto';
import { ZodValidationPipe } from 'src/pipes/ZodValidationPipe';
import { Country, Prisma } from '@prisma/client';
import { ParseCountriesPipe } from 'src/pipes/Countries/ParseCountriesPipe';

@ApiTags("Countries")
@Controller('countries')
export class CountriesController {
	constructor(private countriesService : CountriesService) {}

	@Post()
	@UsePipes(new ZodValidationPipe(CreateCountrySchema))
	async createCountry(@Body() data : CreateCountryDto) : Promise<void>
	{
		const parsedData : Prisma.CountryCreateInput = new ParseCountriesPipe().transform(data)
		await this.countriesService.createCountry(parsedData)
	}

	@Get()
	async getCountries
	(
		@Query("page", new DefaultValuePipe(1), new ParseIntPipe({ optional : true})) page : number
	) : Promise<Country[]>
	{
		return await this.countriesService.findCountries({ page })
	}

	@Get(":id")
	async getCountryById(@Param("id", ParseIntPipe) id : number)
	{
		return await this.countriesService.findCountryById(id)
	}

	@Put(":id")
	@UsePipes(new ZodValidationPipe(UpdateCountrySchema))
	async updateCountry(@Param("id", ParseIntPipe) id : number, @Body() data : UpdateCountryDto ) : Promise<Country>
	{
		const country = await this.countriesService.findCountryById(id)

		if(country) return await this.countriesService.updateCountry(id , data)
		else throw new HttpException("El id de país, no existe", HttpStatus.NOT_FOUND)
	}

	@Delete(":id")
	async deleteCountry(@Param("id", ParseIntPipe) id : number) : Promise<void>
	{
		const country = await this.countriesService.findCountryById(id)

		if(country) await this.countriesService.deleteCountry(id)
		else throw new HttpException("El id de país, no existe", HttpStatus.NOT_FOUND)
	}
}