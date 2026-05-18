import { Inject, Injectable } from '@nestjs/common';
import { dbClient } from '../../core/db/db.constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../core/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ProductsService {
    constructor(
        @Inject(dbClient) private readonly db: NodePgDatabase<typeof schema>
    ) { }

    async getAllProducts() {
        return await this.db.select({
            name: schema.products.name,
            quantity: schema.products.quantity,
            expiry: schema.products.expiry,
            barcode: schema.products.barcode
        }).from(schema.products)
    }

    async addNewProduct(payload: schema.InsertedProduct) {
        return await this.db.insert(schema.products).values(payload).returning({ name: schema.products.name, quantity: schema.products.quantity });
    }

    async editEsixtingProduct(payload: schema.InsertedProduct) {
        return await this.db.update(schema.products).set({
            name: payload.name,
            quantity: payload.quantity,
            expiry: payload.expiry,
            barcode: payload.barcode
        })
            .where(eq(schema.products.barcode, payload.barcode))
            .returning({ name: schema.products.name, quantity: schema.products.quantity })
    }

    async deleteExistingProduct(barcode: string) {
        return await this.db.delete(schema.products).where(eq(schema.products.barcode, barcode)).returning({ name: schema.products.name })
    }
}
