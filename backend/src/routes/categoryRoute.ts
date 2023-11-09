import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { Categories } from "../db/entities/Categories.js";
import { ICreateCategoryBody } from "../types.js";

async function categoryRoutes(app: FastifyInstance, _options = {}) {
	
	if (!app) {
		throw new Error("Fastify instance has no value during routes construction");
	}

	// Get method to retrive the list of all categories
    app.get("/categories", async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const categories = await req.em.find(Categories, {});
            return categories;
        } catch (err) {
            // Using the Fastify's built-in logging method for error handling
            req.log.error(err, "Failed to retrieve categories");
            return rep.status(500).send({ message: "Internal Server Error" });
        }
    });

	// POST method to create new a  new category
	app.post<{ Body: ICreateCategoryBody }>("/categories", {
        // Validating the schema of the new data of the POST request
        schema: {
            body: {
                type: 'object',
                required: ['name'],
                properties: {
                    name: { type: 'string' },
                },
            },
        },
        handler: async (req, rep) => {
            const { name } = req.body;
            try {
                const newCategory = req.em.create(Categories, { name });
                await req.em.persistAndFlush(newCategory);
                req.log.info("Created Category", newCategory);
                return rep.status(201).send(newCategory);
            } catch (err) {
                req.log.error(err, "Failed to create a new category");
                return rep.status(500).send({ message: "Internal Server Error" });
            }
        }
    });
}
export default categoryRoutes;
