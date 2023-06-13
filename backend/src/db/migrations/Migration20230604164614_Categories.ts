import { Migration } from "@mikro-orm/migrations";

export class Migration20230604164614_Categories extends Migration {
	async up(): Promise<void> {
		this.addSql(
			'create table "categories" ("id" serial primary key, "name" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);'
		);

		this.addSql(
			'create table "products" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "category_id" int not null, "price" int not null, "discount" int not null, "description" varchar(255) not null, "product_id" int not null);'
		);

		this.addSql(
			'create table "sales" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "product_id" int not null, "quantity" int not null, "total_price" int not null);'
		);

		this.addSql(
			'create table "suppliers" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "supplier_id" int not null, "name" varchar(255) not null, "email" varchar(255) not null, "comp_name" varchar(255) not null, "addr" varchar(255) not null, "product" varchar(255) not null);'
		);
		this.addSql(
			'alter table "suppliers" add constraint "suppliers_supplier_id_unique" unique ("supplier_id");'
		);
		this.addSql(
			'alter table "suppliers" add constraint "suppliers_email_unique" unique ("email");'
		);
		

		this.addSql(
			'alter table "products" add constraint "products_category_id_foreign" foreign key ("category_id") references "categories" ("id") on update cascade;'
		);

		this.addSql(
			'alter table "sales" add constraint "sales_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade;'
		);

		this.addSql('alter table "user" alter column "id" type int using ("id"::int);');
	}

	async down(): Promise<void> {
		this.addSql('alter table "products" drop constraint "products_category_id_foreign";');

		
		this.addSql('alter table "sales" drop constraint "sales_product_id_foreign";');

		this.addSql('drop table if exists "categories" cascade;');

		this.addSql('drop table if exists "products" cascade;');

		this.addSql('drop table if exists "sales" cascade;');

		this.addSql('drop table if exists "suppliers" cascade;');
		
		this.addSql('alter table "user" alter column "id" type int using ("id"::int);');
	}
}
