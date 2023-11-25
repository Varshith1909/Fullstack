import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { Products } from "../db/entities/Products.js";
import { ICreateProductBody } from "../types.js";

async function productsRoutes(app: FastifyInstance, _options = {}) {
    // GET method to Retrieve the list of all products
    app.get("/products", async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const products = await req.em.find(Products, {});
            return products;
        } catch (err) {
            req.log.error(err, "Failed to retrieve products");
            return rep.status(500).send({ message: "Internal Server Error" });
        }
    });

    // POST method to Create and add a new product
    app.post<{ Body: ICreateProductBody }>("/products", {
        schema: {
            body: {
                type: 'object',
                required: ['name', 'price', 'discount', 'description', 'position', 'expiry_date', 'productId'],
                properties: {
                    name: { type: 'string' },
                    price: { type: 'number' },
                    discount: { type: 'number' },
                    description: { type: 'string' },
                    position: { type: 'string' },
                    expiry_date: { type: 'string', format: 'date-time' },
                    productId: { type: 'number' },
                },
            },
        },
        handler: async (req, rep) => {
            const { name, price, discount, description, position, expiry_date, productId } = req.body;

            try {
                const newProduct = req.em.create(Products, {
                    name,
                    price,
                    discount,
                    description,
                    position,
                    expiry_date,
                    productId,
                });

                await req.em.persistAndFlush(newProduct);
                req.log.info("Created Product", newProduct);
                return rep.status(201).send(newProduct);
            } catch (err) {
                req.log.error(err, "Failed to create a new product");
                return rep.status(500).send({ message: "Internal Server Error" });
            }
        }
    });
}

export default productsRoutes;
