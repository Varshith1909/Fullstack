// Importing necessary dependencies to setup Fastify Server
import dotenv from "dotenv";
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FastifyMikroOrmPlugin } from "./plugins/mikro.js";
import config from "./db/mikro-orm.config.js";
import productsRoutes from "./routes/productRoute.js";
import SalesRoute from "./routes/salesRoute.js";
import suppliersRoutes from "./routes/supplierRoute.js";
import Routes from "./routes/routes.js";
import { FastifySearchHttpMethodPlugin } from "./plugins/http_search.js";
import cors from "@fastify/cors"

dotenv.config()

// Configuration of Logger based on the Environment
const loggerconfig = {
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

// Creating the Fastify instance
const app = Fastify({
	logger: loggerconfig[process.env.NODE_ENV]
});

await app.register(cors, {
	origin: (origin, cb) => {
		cb(null, true);
	},
	methods: ['GET','POST','PUT','DELETE','PATCH','SEARCH'],
});

//Plugins and Routes Registerion
async function registerAppComponents() {
	try {
	await app.register(FastifyMikroOrmPlugin, config);
	await app.register(FastifySearchHttpMethodPlugin);
	await app.register(Routes);
	await app.register(productsRoutes);
	await app.register(SalesRoute);
	await app.register(suppliersRoutes)
} catch (error) {
    app.log.error(error, "Error registering app components");
    throw error; // Throwing the error to handle it in the caller function.
  }
}

// Self-invoking function to register components
(async () => {
	await registerAppComponents();
  })();


export default app;
