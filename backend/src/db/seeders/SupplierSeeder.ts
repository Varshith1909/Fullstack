import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Suppliers } from '../entities/Suppliers.js';
import { ICreateSupplierBody } from '../../types.js';

export class SupplierSeeder extends Seeder {
  
  async run(em: EntityManager): Promise<void> {
    const suppliersData: ICreateSupplierBody[] = [
      {
        supplier_id: 1,
        name: 'Supplier 1',
        email: 'supplier1@example.com',
        compName: 'Company 1',
        addr: 'Address 1',
        product: 'Product 1',
        comp_Name: 'Company Name 1',
      },
      {
        supplier_id: 2,
        name: 'Supplier 2',
        email: 'supplier2@example.com',
        compName: 'Company 2',
        addr: 'Address 2',
        product: 'Product 2',
        comp_Name: 'Company Name 2',
      },
    ];
    
    const suppliers: Suppliers[] = suppliersData.map(data => em.create(Suppliers, data));
    
    await em.getRepository(Suppliers).persistAndFlush(suppliers);
  }
}

