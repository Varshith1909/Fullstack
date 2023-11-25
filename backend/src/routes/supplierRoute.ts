import { FastifyInstance } from "fastify";
import { Suppliers } from "../db/entities/Suppliers.js";
import { ICreateSupplierBody } from "../types.js";

async function suppliersRoutes(app: FastifyInstance) {
    // GET method to retrieve the list of all suppliers
    app.get("/suppliers", async (req, rep) => {
        try {
            const suppliers = await req.em.find(Suppliers, {});
            return rep.send(suppliers);
        } catch (err) {
            req.log.error(err, "Failed to retrieve suppliers");
            return rep.status(500).send({ message: "Internal Server Error" });
        }
    });

    // POST method to create a new supplier with validation
    app.post<{ Body: ICreateSupplierBody }>("/suppliers", {
        schema: {
            body: {
                type: 'object',
                required: ['name', 'email', 'compName', 'addr', 'product'],
                properties: {
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    compName: { type: 'string' },
                    addr: { type: 'string' },
                    product: { type: 'string' },
                },
            },
        },
        handler: async (req, rep) => {
            const { name, email, compName, addr, product } = req.body;

            try {
                const newSupplier = req.em.create(Suppliers, {
                    name,
                    email,
                    comp_Name:compName,
                    addr,
                    product,
                });

                await req.em.persistAndFlush(newSupplier);
                req.log.info("Created Supplier", newSupplier);
                return rep.status(201).send(newSupplier);
            } catch (err) {
                req.log.error(err, "Failed to create a new supplier");
                return rep.status(500).send({ message: "Internal Server Error" });
            }
        }
    });
}

export default suppliersRoutes;
