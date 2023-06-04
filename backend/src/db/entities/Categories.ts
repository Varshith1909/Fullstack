import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";

@Entity()
export class Category extends BaseEntity {
  @Property()
  name!: string;
  
  @Property()
  created_at = new Date();
  
  @Property({ onUpdate: () => new Date() })
  updated_at = new Date();
}
