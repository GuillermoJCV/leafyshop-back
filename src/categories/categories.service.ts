import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category, Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma : PrismaService) {}

  async create(data: Prisma.CategoryCreateInput) : Promise<Category>
  {
    return this.prisma.category.create({ data });
  }

  async findAll(params : {
    page : number;
    cursor? : Prisma.CategoryWhereUniqueInput;
    where? : Prisma.CategoryWhereInput;
    orderBy? : Prisma.SubCategoryOrderByWithRelationInput;
  }) : Promise<Category[]>
  { 
    const { page, cursor, where, orderBy } = params
    if(page) {
      const skip = (page - 1) * 10
      const take = page * 10
      return await this.prisma.category.findMany({ skip, take, cursor, where, orderBy })
    }
    else throw new HttpException("La página tiene que ser mayor a 0", HttpStatus.BAD_REQUEST)
  }

  async findOne(id: number)
  {
    return await this.prisma.category.findUnique({ where : { id } });
  }

  async update(id: number, data: Prisma.CategoryUpdateInput)
  {
    return await this.prisma.category.update({ where : { id }, data });
  }

  async remove(id: number)
  {
    return this.prisma.category.delete({ where : { id } });
  }
}
