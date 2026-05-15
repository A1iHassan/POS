import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/db/db.module';
import { ProductsController } from './presentation/products.controller';
import { ProductsService } from './products.service';

@Module({
    imports: [DatabaseModule],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule { }
