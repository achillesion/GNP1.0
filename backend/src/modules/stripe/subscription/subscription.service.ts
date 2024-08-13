import Stripe from 'stripe';
import { StripeService } from '../stripe.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SubscriptionService extends StripeService {
  public async createSubscription(
    customerId: string,
    planId: string,
  ): Promise<Stripe.Response<Stripe.Subscription>> {
    const subscription = await this.stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          plan: planId,
        },
      ],
    });

    return subscription;
  }

  public async getSubscriptions(): Promise<Stripe.Subscription[]> {
    const subscriptions = await this.stripe.subscriptions.list();

    return subscriptions.data;
  }

  public async cancelSubscriptions(
    id: string,
  ): Promise<Stripe.Response<Stripe.Subscription>> {
    return this.stripe.subscriptions.cancel(id);
  }
}
