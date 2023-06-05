import { Entity, Property, ManyToOne } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";
import { Categories } from "./Categories.js";

@Entity()
export class Products extends BaseEntity {
	@Property()
	name!: string;

	@ManyToOne(() => Categories)
	category!: Categories;

	@Property()
	price!: number;

	@Property()
	discount!: number;

	@Property()
	description!: string;

	@Property()
	productId!: number;
}
