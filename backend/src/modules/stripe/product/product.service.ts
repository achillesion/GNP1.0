import Stripe from 'stripe';
import { StripeService } from '../stripe.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService extends StripeService {
  public async createProduct(name: string): Promise<Stripe.Product> {
    return this.stripe.products.create({
      name,
    });
  }

  public async getProducts(): Promise<Stripe.Product[]> {
    const products = await this.stripe.products.list();

    return products.data;
  }

  public async getProduct(
    id: string,
  ): Promise<Stripe.Response<Stripe.Product>> {
    return this.stripe.products.retrieve(id);
  }

  public async deleteProduct(
    id: string,
  ): Promise<Stripe.Response<Stripe.DeletedProduct>> {
    return this.stripe.products.del(id);
  }
}
