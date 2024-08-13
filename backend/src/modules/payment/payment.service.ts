import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/entities/payment.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { EXCEPTION } from 'src/common/constants/exception.constant';
import { UserService } from '../user/user.service';

@Injectable()
export class PaymentService {
  public constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly userService: UserService,
  ) {}

  public async createPayment(
    createPaymentDto: CreatePaymentDto,
    userId: string,
  ) {
    const user = await this.userService.getUserById(userId);

    const entity = this.paymentRepository.create({
      ...createPaymentDto,
      user: user.result.data,
    });

    const payment = await this.paymentRepository.save(entity);

    return {
      message: 'Payment was created',
      result: {
        data: payment,
      },
      statusCode: HttpStatus.CREATED,
    };
  }

  public async getPaymentById(id: string) {
    const payment = await this.paymentRepository.findOneBy({ id });

    if (!payment) {
      throw new NotFoundException(EXCEPTION.PAYMENT_NOT_FOUND);
    }

    return {
      message: 'Payment was found',
      result: {
        data: payment,
      },
      statusCode: HttpStatus.OK,
    };
  }

  public async getPaymentByUserId(id: string) {
    const payment = await this.paymentRepository.findOne({
      where: {
        user: {
          id,
        },
      },
      select: {
        user: {
          id: true,
          name: true,
          avatar: true,
          financialInfo: true,
          email: true,
          phone: true,
          country: true,
          state: true,
          city: true,
        },
      },
      relations: {
        user: true,
      },
    });

    return {
      message: 'Payment was found',
      result: {
        data: payment,
      },
      statusCode: HttpStatus.OK,
    };
  }

  public async updatePaymentById(id: string, updates: UpdatePaymentDto) {
    const payment = await this.getPaymentById(id);

    Object.assign(payment.result.data, updates);

    const result = await this.paymentRepository.save(payment.result.data);

    return {
      message: 'Payment info was updated',
      result: {
        data: result,
      },
      statusCode: HttpStatus.OK,
    };
  }

  public async deletePaymentById(id: string) {
    const payment = await this.getPaymentById(id);

    await this.paymentRepository.delete(payment.result.data.id);

    return {
      message: 'Payment info was deleted',
      result: {
        data: null,
      },
      statusCode: HttpStatus.OK,
    };
  }
}
