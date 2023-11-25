import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { Sales } from "../db/entities/Sales.js";
import { ICreateSaleBody } from "../types.js";

async function salesRoutes(app: FastifyInstance,_options = {}) {
    // GET method to retriew list of all sales
    app.get("/sales", async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const sales = await req.em.find(Sales, {});
            return rep.send(sales);  
        } catch (err) {
            req.log.error(err, "Failed to retrieve sales");
            return rep.status(500).send({ message: "Internal Server Error" });
        }
    });
    
    // POST Method to Creates a new sale with validation
    app.post<{ Body: ICreateSaleBody }>("/sales", {
        schema: {
            body: {
                type: 'object',
                required: ['productId', 'quantity', 'total_price'],
                properties: {
                    productId: { type: 'number' },
                    quantity: { type: 'number' },
                    total_price: { type: 'number' },
                },
            },
        },
        handler: async (req, rep) => {
            const { productId, quantity, total_price } = req.body;        
            try {
                const product = await req.em.findOne(Sales, { id: productId });
                if (!product) {
                    return rep.status(404).send({ message: "Product not found" });
                }

                const newSale = req.em.create(Sales, {
                    product,
                    quantity,
                    total_price,
                });
                
                await req.em.persistAndFlush(newSale);
                req.log.info("Created Sale", newSale);
                return rep.status(201).send(newSale);
            } catch (err) {
                req.log.error(err, "Failed to create a new sale");
                return rep.status(500).send({ message: "Internal Server Error" });
            }
        }
    });
}

export default salesRoutes;
