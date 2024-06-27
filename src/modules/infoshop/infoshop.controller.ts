import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InfoshopService } from './infoshop.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';

import { CreateProductDto } from '../product/dto/create-product.dto';
import { CreateInfoShopDto } from './dto/create-infoshop.dto';
import { UserRole } from '../user/entities/user.entity';
import { BranchShopInfo } from './entities/infro-branchshop.entity';

@ApiBearerAuth()
@ApiTags('InfoShop')
@Controller('api/infoshop')
export class InfoshopController {
  constructor(private infoShopService: InfoshopService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  createInfoShop(@Body() infoShop: CreateInfoShopDto): Promise<BranchShopInfo> {
    return this.infoShopService.createInfoShop(infoShop);
  }
}
