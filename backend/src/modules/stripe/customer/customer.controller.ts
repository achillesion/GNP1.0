import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CustomerService } from './customer.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('stripe')
@Controller('stripe')
export class CustomerController {
  public constructor(private readonly customerService: CustomerService) {}

  @Post('/customers')
  public async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    const customer =
      await this.customerService.createCustomer(createCustomerDto);

    return {
      message: 'Customer was created',
      result: {
        data: customer,
      },
      statusCode: HttpStatus.CREATED,
    };
  }

  @Get('/customers')
  public async getCustomers(@Query('limit') limit: number) {
    const customers = await this.customerService.getCustomers(limit);

    return {
      message: 'Customers were found',
      result: {
        data: customers,
      },
      statusCode: HttpStatus.OK,
    };
  }
}
