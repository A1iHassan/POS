import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/Auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ProductsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
