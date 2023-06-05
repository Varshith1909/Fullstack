import { Entity, Property, ManyToOne } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";
import { Products } from "./Products.js";

@Entity()
export class Sales extends BaseEntity {
	@ManyToOne(() => Products)
	product!: Products;

	@Property()
	quantity!: number;

	@Property()
	total_price!: number;
}
