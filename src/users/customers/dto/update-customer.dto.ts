import { PartialType } from '@nestjs/swagger';
import { CreateCustomerDto, CreateCustomerScheme } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}

export const UpdateCustomerScheme = CreateCustomerScheme.partial()