import { Entity, Property, ManyToOne } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";
import { Categories } from "./Categories.js";

@Entity()
export class Products extends BaseEntity {
	@Property()
	name!: string;
	@Property()
	price!: number;

	@Property()
	discount!: number;

	@Property()
	description!: string;

	@Property()
	productId!: number;
	
	@Property({nullable: true})
	expiry_date?: Date;
	
	@Property()
	position!: string;
	
	@Property()
	Manifacture_date = new Date();
}
