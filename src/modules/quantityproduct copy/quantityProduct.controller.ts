import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { QuantityProductService } from './quantityProduct.service';
import { CreateQuantityProductDto } from './dto/create-quantity-product.dto';
import { QuantityProduct } from '../product/entities/quantity-product.entity';
import { UserRole } from '../user/entities/user.entity';
import { UpdateQuantityProductDto } from './dto/update-quantity-product-shop.dto';

@ApiBearerAuth()
@ApiTags('QuantityProduct')
@Controller('api/quantity-product')
export class QuantityProductController {
  constructor(private quantityProductService: QuantityProductService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  createquantityProduct(
    @Body() payload: CreateQuantityProductDto,
  ): Promise<QuantityProduct> {
    console.log(payload);

    return this.quantityProductService.createQuantityProduct(payload);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put('/:branchId')
  updateQuantityProduct(
    @Param('branchId') branchShopId: string,
    @Body() payload: UpdateQuantityProductDto,
  ): Promise<void> {
    return this.quantityProductService.updateQuantityProduct(
      branchShopId,
      payload,
    );
  }
}
