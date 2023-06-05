import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { Products } from "../db/entities/Products.js";
import { ICreateProductBody } from "../types.js";

async function productsRoutes(app: FastifyInstance, _options = {}) {
	if (!app) {
		throw new Error("Fastify instance has no value during routes construction");
	}

	app.get("/products", async (req: FastifyRequest, rep: FastifyReply) => {
		try {
			const products = await req.em.find(Products, {});
			return products;
		} catch (err) {
			console.error(err);
			rep.status(500).send(err);
		}
	});

	app.post<{ Body: ICreateProductBody }>("/products", async (req, rep) => {
		const { name, categoryId, price, discount, description, productId } = req.body;

		try {
			const newProduct = await req.em.create(Products, {
				name,
				category: categoryId,
				price,
				discount,
				description,
				productId,
			});

			await req.em.flush();

			console.log("Created Product", newProduct);
			return rep.send(newProduct);
		} catch (err) {
			console.log("Failed to create new product", err.message);
			return rep.status(500).send({ message: err.message });
		}
	});
}

export default productsRoutes;
