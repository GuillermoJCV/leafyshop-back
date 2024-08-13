import { Injectable } from '@nestjs/common';
import { Country, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CountriesService {
	constructor(private prisma : PrismaService) {}

	async createCountry(data : Prisma.CountryCreateInput) : Promise<Country> {

		return this.prisma.country.create({ data })
	}

	async findCountries(params : {
		page? : number;
		cursor? : Prisma.CountryWhereUniqueInput;
		where? : Prisma.CountryWhereInput;
		orderBy? : Prisma.CountryOrderByWithRelationInput;
	}) : Promise<Country[]> {
		const { page, cursor, where, orderBy} = params

		const skip = (page - 1) * 10
		const take = page * 10

		return await this.prisma.country.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy
		})
	}

	async findCountryById(id : number) : Promise<Country | null> {
		const country = await this.prisma.country.findUnique({ where : { id } })
		return country;
	}

	async findCountryByName(name : string) : Promise<Country | null> {
		const country = await this.prisma.country.findUnique({ where : { name } })
		return country;
	}

	async updateCountry(id : number, data : Prisma.CountryUpdateInput) : Promise<Country> {
		return this.prisma.country.update({ where : { id }, data })
	}

	async deleteCountry(id : number) : Promise<Country> {
		return await this.prisma.country.delete({ where : { id }})
	}
}
