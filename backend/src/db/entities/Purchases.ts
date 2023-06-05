import { Entity, Property, ManyToOne } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";
import { Categories } from "./Categories.js";
import { Suppliers } from "./Suppliers.js";

@Entity()
export class Purchases extends BaseEntity {
	@Property()
	product!: string;

	@ManyToOne(() => Categories)
	category!: Categories;

	@ManyToOne(() => Suppliers)
	supplier!: Suppliers;

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
