import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { BranchshopModule } from './modules/branchshop/branchshop.module';
import { InfoshopModule } from './modules/infoshop/infoshop.module';
import { QuantityProductModule } from './modules/quantityproduct copy/quantityProduct.module';
import { OrderModule } from './modules/order/order.module';
import { LoggerModule } from './Log/logger.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'shopdb',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      // logging: true,
    }),

    AuthModule,
    UserModule,
    ProductModule,
    CategoryModule,
    BranchshopModule,
    InfoshopModule,
    QuantityProductModule,
    OrderModule,
    JwtModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
