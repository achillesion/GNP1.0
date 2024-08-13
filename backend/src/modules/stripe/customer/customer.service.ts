import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeService } from '../stripe.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';

@Injectable()
export class CustomerService extends StripeService {
  public async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<Stripe.Customer> {
    return this.stripe.customers.create({
      name: createCustomerDto.name,
      email: createCustomerDto.email,
      payment_method: createCustomerDto.paymentMethod,
      invoice_settings: {
        default_payment_method: createCustomerDto.paymentMethod,
      },
    });
  }

  public async getCustomers(limit: number): Promise<Stripe.Customer[]> {
    const customers = await this.stripe.customers.list({
      limit,
    });

    return customers.data;
  }
}
