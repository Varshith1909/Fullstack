import dotenv from 'dotenv';
import Fastify, {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {User} from "./db/entities/User.js";
import {FastifyMikroOrmPlugin} from "./plugins/mikro.js";
import config from "./db/mikro-orm.config.js";
import Routes from "./routes.js";

dotenv.config();

const app:FastifyInstance = Fastify();

await app.register(FastifyMikroOrmPlugin, config);

await app.register(Routes);


export default app;
