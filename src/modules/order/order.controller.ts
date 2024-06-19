import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Put,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { UserRole } from 'src/entities/user.entity';
import { Order } from 'src/entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderProduct } from 'src/entities/order-product.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptor/respone.interceptor';
import { ResponeData } from './dto/respone-data';

@ApiBearerAuth()
@ApiTags('Order')
@Controller('api/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Post()
  createOrder(
    @Request() req: any,
    @Body() createOrder: CreateOrderDto,
  ): Promise<OrderProduct> {
    let userId = req.user.id;
    return this.orderService.createOrder(parseInt(userId), createOrder);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @UseInterceptors(TransformInterceptor)
  @Get()
  async getOrder(@Request() req: any): Promise<{ message: string; data: any }> {
    let userId = req.user.id;
    let data = await this.orderService.getOrder(parseInt(userId));

    const message = 'get data oke';
    return { message, data };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Put(':id')
  addOneProductToOneOrder(
    @Request() req: any,
    @Param('id') idOrder: string,
    @Body() product: CreateOrderDto,
  ): Promise<number> {
    let userId = req.user.id;
    return this.orderService.addOneProductToOneOrder(
      parseInt(userId),
      parseInt(idOrder),
      product,
    );
  }
}
