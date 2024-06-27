import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { BranchshopService } from './branchshop.service';
import { CreateBranchShopDto } from './dto/create-branchshop.dto';
import { UserRole } from '../user/entities/user.entity';
import { BranchShop } from './entities/branchshop.entity';

@ApiBearerAuth()
@ApiTags('BranchShop')
@Controller('api/branchshop')
export class BranchshopController {
  constructor(private branchShopService: BranchshopService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  createBranchShop(
    @Body() branchShop: CreateBranchShopDto,
  ): Promise<BranchShop> {
    return this.branchShopService.createBranchShop(branchShop);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  getAllBranchShop(): Promise<BranchShop[]> {
    return this.branchShopService.getAllBranchShop();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get(':id')
  getOneBranchShop(@Param('id') id: string): Promise<BranchShop> {
    return this.branchShopService.getOneBranchShop(id);
  }
}
