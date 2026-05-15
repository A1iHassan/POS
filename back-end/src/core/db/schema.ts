import { pgTable, uuid, text, integer, date } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    quantity: integer('quantity').notNull().default(0),
    expiry: date('expiry'),
});