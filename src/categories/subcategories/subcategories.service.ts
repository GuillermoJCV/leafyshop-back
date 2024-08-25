import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { Prisma, SubCategory } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubcategoriesService {
  constructor(private prisma : PrismaService) {}

  async create(data: Prisma.SubCategoryUncheckedCreateInput) : Promise<SubCategory>
  {
    return await this.prisma.subCategory.create({ data });
  }

  async findAll(params : {
    page : number;
    cursor? : Prisma.SubCategoryWhereUniqueInput;
    where? : Prisma.SubCategoryWhereInput;
    orderB? : Prisma.SubCategoryOrderByWithRelationInput;
  }) : Promise<SubCategory[]>
  {
    const { page, cursor, where, orderBy } = params
    if(page) {
      const skip = (page - 1) * 10
      const take = page * 10
      return await this.prisma.subCategory.findMany({ skip, take, cursor, where, orderBy });
    }
    else throw new HttpException("La página debe ser mayor a 0", HttpStatus.BAD_REQUEST)
  }

  async findOne(id: number) : Promise<SubCategory>
  {
    return await this.prisma.subCategory.findUnique({ where : { id } });
  }

  async update(id: number, data: Prisma.SubCategoryUncheckedUpdateInput) : Promise<SubCategory>
  {
    return await this.prisma.subCategory.update({ where : { id }, data });
  }

  async remove(id: number) : Promise<SubCategory>
  {
    return await this.prisma.subCategory.delete({ where : { id } });
  }
}
