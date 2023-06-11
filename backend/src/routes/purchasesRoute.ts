import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { Purchases } from "../db/entities/Purchases.js";
import { Suppliers } from "../db/entities/Suppliers.js";
import { ICreatePurchaseBody } from "../types.js";

async function purchasesRoutes(app: FastifyInstance, _options = {}) {
	if (!app) {
		throw new Error("Fastify instance has no value during routes construction");
	}
	
	app.get("/purchases", async (req: FastifyRequest, rep: FastifyReply) => {
		try {
			const purchases = await req.em.find(Purchases, {});
			return purchases;
		} catch (err) {
			console.error(err);
			rep.status(500).send(err);
		}
	});
	
	app.post<{ Body: ICreatePurchaseBody }>("/purchases", async (req, rep) => {
		const { product, supplier_id, cost_price, quantity, expiry_date, position } = req.body;
		
		try {
			const newPurchase = await req.em.create(Purchases, {
				product,
				supplier: supplier_id,
				cost_price,
				quantity,
				expiry_date,
				position
			});
			
			await req.em.flush();
			
			console.log("Created Purchase", newPurchase);
			return rep.send(newPurchase);
		} catch (err) {
			console.log("Failed to create new purchase", err.message);
			return rep.status(500).send({ message: err.message });
		}
	});
	
	app.search("/purchases", async (req, reply) => {
		const { product } = req.body;
		
		try {
			const theProduct = await req.em.findOneOrFail(Purchases, product, {strict: true});
			reply.send(theProduct);
		} catch (err) {
			reply.status(500).send(err);
		}
	});
}

export default purchasesRoutes;
