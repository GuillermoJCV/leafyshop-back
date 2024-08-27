import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma : PrismaService) {}

  async create(data: Prisma.ProductUncheckedCreateInput) : Promise<Product>
  {
    return await this.prisma.product.create({ data }) ;
  }

  async findAll(params : {
    page : number;
    cursor? : Prisma.ProductWhereUniqueInput;
    where? : Prisma.ProductWhereInput;
    orderBy? : Prisma.ProductOrderByWithRelationInput;
  }) : Promise<Product[]>
  { 
    const { page, cursor, where, orderBy } = params

    if(page > 0) {
      const skip = (page - 1) * 10
      const take = page * 10
      return await this.prisma.product.findMany({ skip , take, cursor, where, orderBy });
    }
    else throw new HttpException("La página debe ser mayor a 0", HttpStatus.BAD_REQUEST)
  }

  async findOne(id: number) : Promise<Product>
  {
    return await this.prisma.product.findUnique({ where : { id } }) ;
  }

  async update(id: number, data: Prisma.ProductUncheckedUpdateInput) : Promise<Product>
  {
    return await this.prisma.product.update({ where : { id }, data });
  }

  async remove(id: number) : Promise<Product>
  {
    return await this.prisma.product.delete({ where : { id } }) ;
  }
}
