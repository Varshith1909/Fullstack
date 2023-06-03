import {FastifyInstance,FastifyRequest,FastifyReply} from "fastify";
import app from './app.js'
import {User} from "./db/entities/User.js";
import {ICreateUserBody} from "./types.js";

async function Routes(app:FastifyInstance, _options = {}){
  if(!app){
	throw new Error("Fastify instance has no value during routes cons");
  }
  app.get("/hello",async(req: FastifyRequest,rep: FastifyReply) => {
	return "Hello";
  });
  
  app.get("/dbTest",async(req:FastifyRequest,rep:FastifyReply) => {
	return req.em.find(User ,{});
  });
  

  
  app.post<{ Body: ICreateUserBody }>("/users", async (req,rep) => {
	const {name,email}=req.body;
	
	try{
	  const newUser = await req.em.create(User,{
		name,
		email
	  });
	  
	  await req.em.flush();
	  
	  console.log("Created User",newUser);
	  return rep.send(newUser);
	}
	catch(err){
	  console.log("Failed to create new user",err.message);
	  return rep.status(500).send({messgae:err.message});
	}
  });
}

export default Routes;
