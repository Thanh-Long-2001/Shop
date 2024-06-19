import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { Product } from "src/entities/product.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([Product])
    ],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService]
})

export class ProductModule {}