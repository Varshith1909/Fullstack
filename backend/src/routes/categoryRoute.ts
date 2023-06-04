import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { Categories } from "../db/entities/Categories.js";
import { ICreateCategoryBody } from "../types.js";

async function categoryRoutes(app: FastifyInstance, _options = {}) {
  if (!app) {
	throw new Error("Fastify instance has no value during routes construction");
  }
  
  app.get("/categories", async (req: FastifyRequest, rep: FastifyReply) => {
	try {
	  const categories = await req.em.find(Categories, {});
	  return categories;
	} catch (err) {
	  console.error(err);
	  rep.status(500).send(err);
	}
  });
  
  app.post<{ Body: ICreateCategoryBody }>("/categories", async (req, rep) => {
	const { name } = req.body;
	
	try {
	  const newCategory = await req.em.create(Categories, {
		name
	  });
	  
	  await req.em.flush();
	  
	  console.log("Created Category", newCategory);
	  return rep.send(newCategory);
	} catch (err) {
	  console.log("Failed to create new category", err.message);
	  return rep.status(500).send({ message: err.message });
	}
  });
}

export default categoryRoutes;
