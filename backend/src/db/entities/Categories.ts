import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";

@Entity()
export class Categories extends BaseEntity {
	@Property()
	name!: string;

	@Property()
	created_at = new Date();

	@Property({ onUpdate: () => new Date() })
	updated_at = new Date();
}
