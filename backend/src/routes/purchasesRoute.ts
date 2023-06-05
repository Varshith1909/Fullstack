import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { Purchases } from "../db/entities/Purchases.js";
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
}

export default purchasesRoutes;
