import { Controller, Get, Post, Patch, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ProductsService } from '../products.service';
import { NewProductDto } from './dto/createProduct';

@Controller("api/v1/products")
export class ProductsController {
    constructor(private readonly service: ProductsService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getProducts() {
        return await this.service.getAllProducts();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addProduct(@Body() payload: NewProductDto) {
        return await this.service.addNewProduct(payload)
    }
}