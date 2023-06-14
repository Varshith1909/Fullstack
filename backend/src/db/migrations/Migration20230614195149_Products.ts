import { Migration } from '@mikro-orm/migrations';

export class Migration20230614195149_Products extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "purchases" cascade;');

    this.addSql('alter table "products" drop constraint "products_category_id_foreign";');

    this.addSql('alter table "categories" alter column "id" type int using ("id"::int);');

    this.addSql('alter table "products" add column "expiry_date" timestamptz(0) null, add column "position" varchar(255) not null, add column "manifacture_date" timestamptz(0) not null;');
    this.addSql('alter table "products" alter column "id" type int using ("id"::int);');
    this.addSql('alter table "products" drop column "category_id";');

    this.addSql('alter table "sales" alter column "id" type int using ("id"::int);');

    this.addSql('alter table "suppliers" alter column "id" type int using ("id"::int);');

    this.addSql('alter table "user" alter column "id" type int using ("id"::int);');
  }

  async down(): Promise<void> {
    this.addSql('create table "purchases" ("id" serial primary key, "product" varchar(255) not null, "category_id" int not null, "supplier_id" int not null, "cost_price" int not null, "quantity" int not null, "expiry_date" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "created_at" timestamptz(0) not null, "position" varchar(255) not null);');

    this.addSql('alter table "purchases" add constraint "purchases_category_id_foreign" foreign key ("category_id") references "categories" ("id") on update cascade;');
    this.addSql('alter table "purchases" add constraint "purchases_supplier_id_foreign" foreign key ("supplier_id") references "suppliers" ("id") on update cascade;');

    this.addSql('alter table "categories" alter column "id" type int using ("id"::int);');

    this.addSql('alter table "products" add column "category_id" int not null;');
    this.addSql('alter table "products" alter column "id" type int using ("id"::int);');
    this.addSql('alter table "products" add constraint "products_category_id_foreign" foreign key ("category_id") references "categories" ("id") on update cascade;');
    this.addSql('alter table "products" drop column "expiry_date";');
    this.addSql('alter table "products" drop column "position";');
    this.addSql('alter table "products" drop column "manifacture_date";');

    this.addSql('alter table "sales" alter column "id" type int using ("id"::int);');

    this.addSql('alter table "suppliers" alter column "id" type int using ("id"::int);');

    this.addSql('alter table "user" alter column "id" type int using ("id"::int);');
  }

}
