import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category, Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma : PrismaService) {}

  async create(data: Prisma.CategoryCreateInput) : Promise<Category>
  {
    const response = this.prisma.category.create({ data });
    if(response) return response
    else throw new HttpException("No se ha podido crear la categoría por un error interno", HttpStatus.NOT_IMPLEMENTED)
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

  async findOne(id: number) : Promise<Category>
  {
    const response = await this.prisma.category.findUnique({ where : { id } });
    if(response) return response
    else throw new HttpException("La categoría buscada, no existe", HttpStatus.NOT_FOUND)
  }

  async update(id: number, data: Prisma.CategoryUpdateInput)
  {
    const response = await this.prisma.category.update({ where : { id }, data });
    if(response) return response
    else throw new HttpException("La categoría buscada, no existe", HttpStatus.NOT_FOUND)
  }

  async remove(id: number)
  {
    const response = this.prisma.category.delete({ where : { id } });
    if(response) return response
    else throw new HttpException("La categoría buscada, no existe", HttpStatus.NOT_FOUND)
  }
}
