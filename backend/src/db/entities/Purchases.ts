import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";

@Entity()
export class Purchase extends BaseEntity {
  @Property()
  product!: string;
  
  // Assuming the relationships with Category and Supplier entities
  @Property()
  category_id!: number;
  
  @Property()
  supplier_id!: number;
  
  @Property()
  cost_price!: number;
  
  @Property()
  quantity!: number;
  
  @Property()
  expiry_date!: Date;
  
  @Property()
  updated_at = new Date();
  
  @Property()
  deleted_at: Date | null = null;
  
  @Property()
  created_at = new Date();
  
  @Property()
  position!: string;
}
