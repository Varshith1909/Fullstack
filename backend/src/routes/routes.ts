import {FastifyInstance,FastifyRequest,FastifyReply} from "fastify";
import {User} from "../db/entities/User.js";
import {ICreateUserBody} from "../types.js";

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

  app.search("/user", async(req, reply)=>{
	  const{email} =req.body;
	  try {
		  const theUser = await req.em.findOne(User, {email});
		  console.log(theUser);
		  reply.send(theUser);
	  } catch(err){
		  console.error(err);
		  reply.status(500).send(err);
	  }
  })
  

  //CRUD
	// C
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

  //Read
  app.search("/users", async(req, reply)=>{
		const{email} =req.body;
		try {
			const theUser = await req.em.findOne(User, {email});
			console.log(theUser);
			reply.send(theUser);
		} catch(err){
			console.error(err);
			reply.status(500).send(err);
		}
  });
  
  //UPDATE
  
  app.put<{Body:ICreateUserBody}>("/users", async(req,rep) => {
	const {name,email} = req.body;
	
	const userToChange = await req.em.findOne(User,{email});
	userToChange.name=name;
	
	await req.em.flush();
	console.log(userToChange);
	rep.send(userToChange);
  });


  //DELETE
  app.delete<{Body:ICreateUserBody}>("/user", async(req,rep) =>{
	const{email} =req.body;
	try {
	  const theUser = await req.em.findOne(User, {email});
	  await req.em.remove(theUser).flush();
	  console.log(theUser);
	  rep.send(theUser);
	} catch(err){
	  console.error(err);
	  rep.status(500).send(err);
	}
  })
}

export default Routes;
