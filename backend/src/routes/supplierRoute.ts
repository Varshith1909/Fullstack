import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { Suppliers } from "../db/entities/Suppliers.js";
import { ICreateSupplierBody } from "../types.js";

async function suppliersRoutes(app: FastifyInstance, _options = {}) {
	if (!app) {
		throw new Error("Fastify instance has no value during routes construction");
	}

	app.get("/suppliers", async (req: FastifyRequest, rep: FastifyReply) => {
		try {
			const suppliers = await req.em.find(Suppliers, {});
			return suppliers;
		} catch (err) {
			console.error(err);
			rep.status(500).send(err);
		}
	});

	app.post<{ Body: ICreateSupplierBody }>("/suppliers", async (req, rep) => {
		const { name, email, compName, addr, product } = req.body;

		try {
			const newSupplier = await req.em.create(Suppliers, {
				name,
				email,
				comp_Name: compName,
				addr,
				product,
			});

			await req.em.flush();

			console.log("Created Supplier", newSupplier);
			return rep.send(newSupplier);
		} catch (err) {
			console.log("Failed to create new supplier", err.message);
			return rep.status(500).send({ message: err.message });
		}
	});
}

export default suppliersRoutes;
