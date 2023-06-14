import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Sales } from '../entities/Sales.js';
import { Products } from '../entities/Products.js';

export class SalesSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const salesData = [
      { productId: 1, quantity: 5, total_price: 100 },
      { productId: 2, quantity: 3, total_price: 50 },
    ];

    for (const sale of salesData) {
      const product = await em.findOne(Products, { productId: sale.productId });

      if (!product) {
        console.error(`Product with ID '${sale.productId}' not found. Skipping sale.`);
        continue;
      }

      const newSale = em.create(Sales, {
        product,
        quantity: sale.quantity,
        total_price: sale.total_price,
      });

      em.persist(newSale);
    }

    await em.flush();
  }
}
