import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('stripe')
@Controller('stripe')
export class ProductController {
  public constructor(private readonly productService: ProductService) {}

  @Post('/products')
  public async createProduct(@Body() { name }: CreateProductDto) {
    const product = await this.productService.createProduct(name);

    return {
      message: 'Product was created',
      result: {
        data: product,
      },
      statusCode: HttpStatus.OK,
    };
  }
}
