import dotenv from "dotenv";
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {Products} from "./db/entities/Products.js";
import { User } from "./db/entities/User.js";
import {SupplierSeeder} from "./db/seeders/SupplierSeeder.js";
import { FastifyMikroOrmPlugin } from "./plugins/mikro.js";
import config from "./db/mikro-orm.config.js";
import productsRoutes from "./routes/productRoute.js";
import SalesRoute from "./routes/salesRoute.js";
import suppliersRoutes from "./routes/supplierRoute.js";
import Routes from "./routes/routes.js";
import { FastifySearchHttpMethodPlugin } from "./plugins/http_search.js";
import cors from "@fastify/cors"

const envToLogger = {
	development: {
		transport: {
			target: 'pino-pretty',
			options: {
				translateTime: 'HH:MM:ss Z',
				ignore: 'pid,hostname',
			},
		},
		level: "debug",
	},
	production: {
		level: "error"
	},
	test: {
		transport: {
			target: 'pino-pretty',
			options: {
				translateTime: 'HH:MM:ss Z',
				ignore: 'pid,hostname',
			},
		},
		level: "warn"
	},
};

const app = Fastify({
	logger: envToLogger[process.env.NODE_ENV]
});

await app.register(cors, {
	origin: (origin, cb) => {
		cb(null, true);
	},
	methods: ['GET','POST','PUT','DELETE','PATCH','SEARCH'],
});


await app.register(FastifyMikroOrmPlugin, config);
await app.register(FastifySearchHttpMethodPlugin);

await app.register(Routes);
await app.register(productsRoutes);
await app.register(SalesRoute);
await app.register(suppliersRoutes)

export default app;
