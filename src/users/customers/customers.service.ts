import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Customer, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma : PrismaService) {}

  async create(data: Prisma.CustomerUncheckedCreateInput) : Promise<Customer> {
    const existsCustomer : Boolean = Boolean(await this.prisma.customer.findUnique({ where : { customer_id : data.customer_id }}))

    if(!existsCustomer) {
      return await this.prisma.customer.create({ data }); 
    }
    else throw new HttpException("El usuario ya está registrado como cliente", HttpStatus.CONFLICT)
  }

  async findAll( params : {
    page : number;
    cursor? : Prisma.CustomerWhereUniqueInput;
    where? : Prisma.CustomerWhereInput;
    orderBy? : Prisma.CustomerOrderByWithRelationInput;
  }
  ) : Promise<Customer[]>
  {
    const { page, cursor, where, orderBy} = params

    if(page) {
      const skip = (page - 1) * 10
      const take = page * 10
      return await this.prisma.customer.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy
      });
    }
    else throw new HttpException("La página no puede ser mayor a 1", HttpStatus.BAD_REQUEST)
  }

  async findOne(customer_id: number) {
    return await this.prisma.customer.findUnique({ where : { customer_id }});
  }

  async update(customer_id: number, data: Prisma.CustomerUpdateInput) {
    return await this.prisma.customer.update({ where : { customer_id }, data });
  }

  async remove(customer_id: number) {
    return await this.prisma.customer.delete({ where : { customer_id }});
  }
}
