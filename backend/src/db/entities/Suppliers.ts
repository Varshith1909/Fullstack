import {Collection, Entity, EntitySchema, OneToMany, PrimaryKey, Property, Unique} from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";

@Entity()
export class Suppliers extends BaseEntity {
  @Property()
  @Unique()
  supplier_id!: number;
  
  @Property()
  name!: string;
  
  @Property()
  @Unique()
  email!: string;
  
  @Property()
  comp_Name!: string;
  
  @Property()
  addr: string;
  
  @Property()
  product!: string;
  
}
