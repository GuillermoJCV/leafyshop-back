import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { District, Prisma } from '@prisma/client';

@Injectable()
export class DistrictsService {
  constructor(private prisma : PrismaService) {}

  async create(data : Prisma.DistrictCreateInput) : Promise<District> 
  {
    return await this.prisma.district.create({ data });
  }

  async findAll(params : {
      page : number | undefined;
      cursor? : Prisma.DistrictWhereUniqueInput;
      where? : Prisma.DistrictWhereInput;
      orderBy? : Prisma.DistrictOrderByWithRelationInput;
  }) : Promise<District[]> 
  {   
    const { page, cursor, where, orderBy } = params

    if(page) {
      const skip = (page - 1) * 10
      const take = page * 10

      return await this.prisma.district.findMany({ skip, take, cursor, where, orderBy })
    } 
    else throw new HttpException("La página no puede ser 0 o indefinido", HttpStatus.BAD_REQUEST)
  }

  async findOne(id: number) : Promise<District | null> {
    return await this.prisma.district.findUnique({ where : { id } });
  }

  async update(id: number, data: Prisma.DistrictUpdateInput) : Promise<District> {
    return await this.prisma.district.update({ where : { id }, data});
  }

  async remove(id: number) {
    return await this.prisma.district.delete({ where : { id } });
  }
}
