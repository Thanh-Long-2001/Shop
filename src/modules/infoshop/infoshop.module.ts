import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchShopInfo } from 'src/entities/infro-branchshop.entity';
import { InfoshopController } from './infoshop.controller';
import { InfoshopService } from './infoshop.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([BranchShopInfo])
    ],
    controllers: [InfoshopController],
    providers: [InfoshopService],
    exports: [InfoshopService]
})
export class InfoshopModule {}
