import dotenv from 'dotenv';
import Fastify, {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {User} from "./db/entities/User.js";
import {FastifyMikroOrmPlugin} from "./plugins/mikro.js";
import config from "./db/mikro-orm.config.js";

dotenv.config();

const app:FastifyInstance = Fastify();

await app.register(FastifyMikroOrmPlugin, config);
app.get("/hello",async(req: FastifyRequest,rep: FastifyReply) => {
  return "Hello";
});

app.get("/dbTest",async(req:FastifyRequest,rep:FastifyReply) => {
  return req.em.find(User ,{});
});

export default app;
