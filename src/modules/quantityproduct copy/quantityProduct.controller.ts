import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { BranchShop } from 'src/entities/branchshop.entity';
import { UserRole } from 'src/entities/user.entity';
import { QuantityProductService } from './quantityProduct.service';
import { CreateQuantityProductDto } from './dto/create-quantity-product.dto';
import { QuantityProduct } from 'src/entities/quantity-product.entity';

@ApiBearerAuth()
@ApiTags('QuantityProduct')
@Controller('api/quantity-product')
export class QuantityProductController {
  constructor(private quantityProductService: QuantityProductService) {}

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN)
  @Post()
  createquantityProduct(
    @Body() quantityProduct: CreateQuantityProductDto,
  ): Promise<QuantityProduct> {
    return this.quantityProductService.createQuantityProduct(quantityProduct);
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put(':productId/:branchId')
  updateQuantityProduct(
    @Param('productId') productId: string,
    @Param('branchId') branchShopId: string,
    @Body() quantity: CreateQuantityProductDto
  ): Promise<void> {
    return this.quantityProductService.updateQuantityProduct(productId, branchShopId, quantity);
  }
}
