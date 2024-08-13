import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ProductService } from './product/product.service';
import { SubscriptionService } from './subscription/subscription.service';
import { ProductController } from './product/product.controller';
import { SubscriptionController } from './subscription/subscription.controller';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer/customer.service';
import { StripeController } from './stripe.controller';

@Module({
  imports: [],
  controllers: [
    StripeController,
    ProductController,
    SubscriptionController,
    CustomerController,
  ],
  providers: [
    StripeService,
    ProductService,
    SubscriptionService,
    CustomerService,
  ],
  exports: [ProductService, SubscriptionService, CustomerService],
})
export class StripeModule {}
