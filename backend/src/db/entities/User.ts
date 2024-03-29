import {
	Collection,
	Entity,
	EntitySchema,
	OneToMany,
	PrimaryKey,
	Property,
	Unique,
} from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";

@Entity()
export class User extends BaseEntity {
	@Property()
	@Unique()
	email!: string;

	@Property()
	name!: string;
}
