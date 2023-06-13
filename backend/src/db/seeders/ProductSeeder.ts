import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Products } from '../entities/Products.js';

export class ProductSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const products: Partial<Products>[] = [
      {
        name: 'Product 1',
        price: 10.99,
        discount: 0.2,
        description: 'Description 1',
        productId : 1,
        position: 'Rack 1'
      },
      {
        name: 'Product 2',
        price: 15.99,
        discount: 0.1,
        description: 'Description 2',
        productId :2,
        position: 'Rack 2'
      },
      {
        name: 'Product 3',
        price: 20.99,
        discount: 0.3,
        description: 'Description 3',
        productId: 3,
        position: 'Rack 1'
      },
      {
        
        name: 'Product 4',
        price: 25.99,
        discount: 0.15,
        description: 'Description 4',
        productId: 4,
        position: 'Rack 2'
      },
    ];
    
    for (const data of products) {
      const product = new Products();
      Object.assign(product, data);
      em.persist(product);
    }
    
    await em.flush();
  }
}
