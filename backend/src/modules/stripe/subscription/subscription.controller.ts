import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('stripe')
@Controller('stripe')
export class SubscriptionController {
  public constructor(
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @Post('/subscriptions')
  public async createSubscription(
    @Body() { customerId, planId }: CreateSubscriptionDto,
  ) {
    const subscription = await this.subscriptionService.createSubscription(
      customerId,
      planId,
    );

    return {
      message: 'Subscription was created',
      result: {
        data: subscription,
      },
      statusCode: HttpStatus.CREATED,
    };
  }

  @Get('/subscriptions')
  public async getSubscriptions() {
    const subscriptions = await this.subscriptionService.getSubscriptions();

    return {
      message: 'Subscriptions were found',
      result: {
        data: subscriptions,
      },
      statusCode: HttpStatus.OK,
    };
  }

  @Delete('/subscriptions/:id')
  public async cancelSubscriptions(@Param('id') id: string) {
    const subscription = await this.subscriptionService.cancelSubscriptions(id);

    return {
      message: 'Subscription was created',
      result: {
        data: subscription,
      },
      statusCode: HttpStatus.OK,
    };
  }
}
