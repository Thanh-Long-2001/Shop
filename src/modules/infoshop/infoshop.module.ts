import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoshopController } from './infoshop.controller';
import { InfoshopService } from './infoshop.service';
import { BranchShopInfo } from './entities/infro-branchshop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BranchShopInfo])],
  controllers: [InfoshopController],
  providers: [InfoshopService],
  exports: [InfoshopService],
})
export class InfoshopModule {}
