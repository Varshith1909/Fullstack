import dotenv from 'dotenv';
import Fastify, {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {FastifyMikroOrmPlugin} from "./plugins/mikro.js";
import config from "./db/mikro-orm.config.js";

dotenv.config();

const app:FastifyInstance = Fastify();

await app.register(FastifyMikroOrmPlugin, config);
app.get("/hello",async(req: FastifyRequest,rep: FastifyReply) => {
  return "Hello";
})

app.listen({port:8081},
  (err,address) => {
  	if(err){
		console.error(err);
		process.exit(1);
	}
	  console.log(`Started server at ${address}`);
  }
  );
