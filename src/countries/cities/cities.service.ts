import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { City, Prisma } from '@prisma/client';

@Injectable()
export class CitiesService {
  constructor(private prisma : PrismaService) {}

  async create(data: Prisma.CityCreateInput) : Promise<City>
  {
    return await this.prisma.city.create({ data });
  }

  async findAll(
  params : {
    page : number,
    cursor? : Prisma.CityWhereUniqueInput,
    where? : Prisma.CityWhereInput,
    orderBy? : Prisma.CityOrderByWithRelationInput
  }
  ) : Promise<City[]>
  {
    const { page, cursor, where, orderBy } = params

    if(page) {
      const take = (page - 1) * 10
      const skip = page * 10

      return await this.prisma.city.findMany({ take, skip, cursor, where, orderBy });
    }
    else throw new HttpException("La página no puede ser 0", HttpStatus.BAD_REQUEST)
  }

  async findOne(id: number) : Promise<City>
  {
    return await this.prisma.city.findUnique({ where : { id } });
  }

  async update(id: number, data: Prisma.CityUpdateInput) : Promise<City>
  {
    return await this.prisma.city.update({ where : { id }, data});
  }

  async remove(id: number) : Promise<City>
  {
    return await this.prisma.city.delete({ where : { id } });
  }
}
