import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";

@Entity()
export class Product extends BaseEntity {
  // Assuming the relationship with Purchase entity
  @Property()
  purchase_id!: number;
  
  @Property()
  price!: number;
  
  @Property()
  discount!: number;
  
  @Property()
  description!: string;
}
