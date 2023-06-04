import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { Sales } from "../db/entities/Sales.js";
import { ICreateSaleBody } from "../types.js";

async function salesRoutes(app: FastifyInstance, _options = {}) {
  if (!app) {
	throw new Error("Fastify instance has no value during routes construction");
  }
  
  app.get("/sales", async (req: FastifyRequest, rep: FastifyReply) => {
	try {
	  const sales = await req.em.find(Sales, {});
	  return sales;
	} catch (err) {
	  console.error(err);
	  rep.status(500).send(err);
	}
  });
  
  // app.post<{ Body: ICreateSaleBody }>("/sales", async (req, rep) => {
	// const { product_id, quantity, total_price } = req.body;
	//
	// try {
	//   const newSale = await req.em.create(Sales, {
	// 	product_id,
	// 	quantity,
	// 	total_price
	//   });
	//
	//   await req.em.flush();
	//
	//   console.log("Created Sale", newSale);
	//   return rep.send(newSale);
	// } catch (err) {
	//   console.log("Failed to create new sale", err.message);
	//   return rep.status(500).send({ message: err.message });
	// }
  // });
}

export default salesRoutes;
