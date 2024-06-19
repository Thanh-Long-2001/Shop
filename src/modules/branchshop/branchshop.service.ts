import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchShop } from 'src/entities/branchshop.entity';
import { Repository } from "typeorm";
import { CreateBranchShopDto } from './dto/create-branchshop.dto';

@Injectable()
export class BranchshopService {
   
    constructor(
        @InjectRepository(BranchShop)
        private branchshopRepository: Repository<BranchShop>
    ) {}

    async createBranchShop(branchShop: CreateBranchShopDto): Promise<BranchShop> {
        return this.branchshopRepository.save(branchShop)
    }

    async getAllBranchShop(): Promise<BranchShop[]> {
        return this.branchshopRepository.find()
    }

    async getOneBranchShop(id: string): Promise<BranchShop> {
        const branchShop = await this.branchshopRepository
            .createQueryBuilder('branchShop')
            .leftJoinAndSelect('branchShop.info', 'info')
            .where('branchShop.id = :id', { id })
            .getOne()
            
        if (branchShop && branchShop.info) {
            const { id, ...infoWithoutId } = branchShop.info
            return { ...branchShop, info: infoWithoutId } as BranchShop
            }
        return branchShop;
    }
}
