import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchshopController } from './branchshop.controller';
import { BranchshopService } from './branchshop.service';
import { BranchShop } from './entities/branchshop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BranchShop])],
  controllers: [BranchshopController],
  providers: [BranchshopService],
  exports: [BranchshopService],
})
export class BranchshopModule {}
