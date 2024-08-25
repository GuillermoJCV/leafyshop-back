import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Employee, Prisma } from '@prisma/client';

@Injectable()
export class EmployeesService {
  constructor(private prisma : PrismaService) {}

  async create(data: Prisma.EmployeeUncheckedCreateInput) : Promise<Employee> 
  {
    return await this.prisma.employee.create({ data });
  }

  async findAll(params : {
    page : number;
    cursor? : Prisma.EmployeeWhereUniqueInput;
    where? : Prisma.EmployeeWhereInput;
    orderBy? : Prisma.EmployeeOrderByWithRelationInput;
  }
  ) : Promise<Employee[]> 
  {
    const {page, cursor, where, orderBy } = params;
    if(page) {
      const skip = (page - 1) * 10
      const take = page * 10

      return await this.prisma.employee.findMany({
        skip, take, cursor, where, orderBy
      });
    }
    else throw new HttpException("La página tiene que ser mayor a 1", HttpStatus.BAD_REQUEST)
  }

  async findOne(employee_id: number) : Promise<Employee>
  {
    return await this.prisma.employee.findUnique({ where : { employee_id }});
  }

  async update(employee_id: number, data: Prisma.EmployeeUpdateInput) 
  {
    return await this.prisma.employee.update({ where : { employee_id }, data });
  }

  async remove(employee_id: number) 
  {
    return await this.prisma.employee.delete({ where : { employee_id }});
  }
}
