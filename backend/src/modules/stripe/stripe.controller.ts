import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { StripeService } from './stripe.service';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { CreateSessionDto } from './dto/create-session.dto';
import { CreatePlanDto } from './dto/create-plan.dto';
import { CreatePriceDto } from './dto/create-price.dto';

@ApiTags('stripe')
@Controller('stripe')
export class StripeController {
  public constructor(private readonly stripeService: StripeService) {}

  @Post('/payment-methods')
  public async createPaymentMethod(
    @Body() createPaymentMethodDto: CreatePaymentMethodDto,
  ) {
    const paymentMethod = await this.stripeService.createPaymentMethod(
      createPaymentMethodDto,
    );

    return {
      message: 'Payment method was created',
      result: {
        data: paymentMethod,
      },
      statusCode: HttpStatus.CREATED,
    };
  }

  @Post('/payment-intents')
  public async createPaymentIntent(
    @Body() createPaymentIntentDto: CreatePaymentIntentDto,
  ) {
    const paymentIntent = await this.stripeService.createPaymentIntent(
      createPaymentIntentDto,
    );

    return {
      message: 'Payment intent was created',
      result: {
        data: paymentIntent,
      },
      statusCode: HttpStatus.CREATED,
    };
  }

  @Post('/prices')
  public async createPrice(@Body() createPriceDto: CreatePriceDto) {
    const createdPrice = await this.stripeService.createPrice(createPriceDto);

    return {
      message: 'Price was created',
      result: {
        data: createdPrice,
      },
      statusCode: HttpStatus.CREATED,
    };
  }

  @Post('/plans')
  public async createPlan(@Body() createPlanDto: CreatePlanDto) {
    const createdPlan = await this.stripeService.createPlan(createPlanDto);

    return {
      message: 'Plan was created',
      result: {
        data: createdPlan,
      },
      statusCode: HttpStatus.CREATED,
    };
  }

  @Post('/sessions')
  public async createSession(@Body() createSessionDto: CreateSessionDto) {
    const createdSession =
      await this.stripeService.createSession(createSessionDto);

    return {
      message: 'Session was created',
      result: {
        data: createdSession,
      },
      statusCode: HttpStatus.CREATED,
    };
  }
}
