import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInfoShopDto } from './dto/create-infoshop.dto';
import { BranchShopInfo } from './entities/infro-branchshop.entity';

@Injectable()
export class InfoshopService {
  constructor(
    @InjectRepository(BranchShopInfo)
    private infoshopRepository: Repository<BranchShopInfo>,
  ) {}

  async createInfoShop(
    branchShopInfo: CreateInfoShopDto,
  ): Promise<BranchShopInfo> {
    return this.infoshopRepository.save(branchShopInfo);
  }
}
