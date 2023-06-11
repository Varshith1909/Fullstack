import { Migration } from "@mikro-orm/migrations";

export class Migration20230604164834_Purchases extends Migration {
	async up(): Promise<void> {
		this.addSql(
			'create table "purchases" ("categories" int not null, "products" string not null, "sales" int not null,suppliers int not null,purchases int not null,user stringnot null, "created_at" timestamptz(0) not null,);'
		);
		this.addSql('alter table "categories" alter column "id" type int using ("id"::int);');

		this.addSql('alter table "products" alter column "id" type int using ("id"::int);');

		this.addSql('alter table "sales" alter column "id" type int using ("id"::int);');

		this.addSql('alter table "suppliers" alter column "id" type int using ("id"::int);');

		this.addSql('alter table "purchases" alter column "id" type int using ("id"::int);');

		this.addSql('alter table "user" alter column "id" type int using ("id"::int);');
	}

	async down(): Promise<void> {
		this.addSql('alter table "categories" alter column "id" type int using ("id"::int);');

		this.addSql('alter table "products" alter column "id" type int using ("id"::int);');

		this.addSql('alter table "sales" alter column "id" type int using ("id"::int);');

		this.addSql('alter table "suppliers" alter column "id" type int using ("id"::int);');

		this.addSql('alter table "purchases" alter column "id" type int using ("id"::int);');

		this.addSql('alter table "user" alter column "id" type int using ("id"::int);');
	}
}
