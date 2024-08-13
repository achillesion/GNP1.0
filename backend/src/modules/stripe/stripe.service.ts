import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { CreatePlanDto } from './dto/create-plan.dto';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { CreateSessionDto } from './dto/create-session.dto';
import { CreatePriceDto } from './dto/create-price.dto';

@Injectable()
export class StripeService {
  public stripe: Stripe;
  private secretKey: string;
  private clientBaseUrl: string;

  public constructor(private readonly configService: ConfigService) {
    this.secretKey = this.configService.get('STRIPE_SECRET_KEY');
    this.clientBaseUrl = this.configService.get('CLIENT_BASE_URL');
    this.stripe = new Stripe(this.secretKey, {
      apiVersion: '2024-04-10',
    });
  }

  public async createPlan(createPlanDto: CreatePlanDto): Promise<Stripe.Plan> {
    return this.stripe.plans.create({
      product: createPlanDto.productId,
      amount: createPlanDto.amount,
      currency: createPlanDto.currency,
      interval: createPlanDto.interval,
    });
  }

  public async createPaymentMethod(
    createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<Stripe.PaymentMethod> {
    return this.stripe.paymentMethods.create({
      type: createPaymentMethodDto.type,
      card: {
        number: createPaymentMethodDto.cardNumber,
        exp_month: createPaymentMethodDto.expireMonth,
        exp_year: createPaymentMethodDto.expireYear,
        cvc: createPaymentMethodDto.cvc,
      },
    });
  }

  public async createPaymentIntent(
    createPaymentIntentDto: CreatePaymentIntentDto,
  ) {
    return this.stripe.paymentIntents.create({
      amount: createPaymentIntentDto.amount,
      currency: createPaymentIntentDto.currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });
  }

  public async createPrice(createPrice: CreatePriceDto) {
    return this.stripe.prices.create({
      currency: 'usd',
      unit_amount: createPrice.unitAmount,
      recurring: {
        interval: 'month',
      },
      product_data: {
        name: createPrice.productName,
      },
    });
  }

  public async createSession(createSessionDto: CreateSessionDto) {
    return this.stripe.checkout.sessions.create({
      success_url: `${this.clientBaseUrl}/success-payment`,
      line_items: [
        {
          price: createSessionDto.priceId,
          quantity: createSessionDto.quantity,
        },
      ],
      mode: 'subscription',
    });
  }
}
