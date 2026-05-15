import { Inject, Injectable } from '@nestjs/common';
import { dbClient } from '../../core/db/db.constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../core/db/schema';

@Injectable()
export class ProductsService {
    constructor(
        @Inject(dbClient) private readonly db: NodePgDatabase<typeof schema>
    ) { }

    async getAllProducts(): Promise<schema.Products[]> {
        return await this.db.select().from(schema.products)
    }

    async addNewProduct(payload: schema.InsertedProduct) {
        return await this.db.insert(schema.products).values(payload).returning({ name: schema.products.name, quantity: schema.products.quantity });
    }
}
