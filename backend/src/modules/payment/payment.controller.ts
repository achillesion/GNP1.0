import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Request } from 'express';

@ApiTags('payments')
@Controller('payments')
export class PaymentController {
  public constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthGuard)
  @Post('/')
  public async createPayment(
    @Body() createPaymentDto: CreatePaymentDto,
    @Req() req: Request,
  ) {
    const userId = req.user.sub;

    return this.paymentService.createPayment(createPaymentDto, userId);
  }

  @UseGuards(AuthGuard)
  @Get('/users')
  public async getPaymentByUserId(@Req() req: Request) {
    const userId = req.user.sub;

    return this.paymentService.getPaymentByUserId(userId);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  public async updatePaymentById(
    @Param('id') id: string,
    @Body() updates: UpdatePaymentDto,
  ) {
    return this.paymentService.updatePaymentById(id, updates);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  public async deletePaymentById(@Param('id') id: string) {
    return this.paymentService.deletePaymentById(id);
  }
}
