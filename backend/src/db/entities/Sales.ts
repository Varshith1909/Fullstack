import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";

@Entity()
export class Sale extends BaseEntity {
  // Assuming the relationship with Product entity
  @Property()
  product_id!: number;
  
  @Property()
  quantity!: number;
  
  @Property()
  total_price!: number;
}
