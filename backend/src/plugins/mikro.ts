import { MikroORM, Options } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";
import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { InferTypeNode } from "ts-morph";

export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

declare module "fastify" {
	interface FastifyInstance {
		db: Awaited<ReturnType<(typeof MikroORM)["init"]>>;
	}

	interface FastifyRequest {
		db: Awaited<ReturnType<(typeof MikroORM)["init"]>>;
		em: EntityManager | undefined;
	}
}

export const fastifyMikroORMCore = async function (fastify, options) {
	const db = await MikroORM.init(options);

	fastify.decorate("db", db);

	fastify.addHook("onRequest", async function (this: typeof fastify, request, reply) {
		request.db = Object.assign({}, this.db);
		request.em = request.db.em.fork() as EntityManager;
	});
	fastify.addHook("onClose", () => {
		db.close();
	});
};

export const FastifyMikroOrmPlugin = fp(fastifyMikroORMCore, {
	name: "fastify-mikro-orm",
});
