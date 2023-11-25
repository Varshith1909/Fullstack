import { FastifyInstance } from "fastify";
import { User } from "../db/entities/User.js";
import { ICreateUserBody } from "../types.js";

async function Routes(app: FastifyInstance,_options = {}) {
    // Hello world route
    app.get("/hello", async (req, rep) => {
        req.log.info("Hello World route called");
        return rep.send("Hello World");
    });

    // Database connection testing route
    app.get("/dbTest", async (req, rep) => {
        try {
            const users = await req.em.find(User, {});
            return rep.send(users);
        } catch (err) {
            req.log.error(err, "Database connection test failed");
            return rep.status(500).send({ message: "Internal Server Error" });
        }
    });

    // User Searching by email
    app.search<{ Body: { email: string } }>("/user", async (req, reply) => {
        const { email } = req.body;
        try {
            const theUser = await req.em.findOne(User, { email });
            if (!theUser) {
                reply.status(404).send({ message: "User not found" });
            } else {
                reply.send(theUser);
            }
        } catch (err) {
            req.log.error(err, "Failed to find user");
            reply.status(500).send({ message: "Internal Server Error" });
        }
    });

    // Creating the user route
    app.post<{ Body: ICreateUserBody }>("/users", async (req, rep) => {
        const { name, email } = req.body;

        try {
            const newUser = req.em.create(User, { name, email });
            await req.em.persistAndFlush(newUser);
            req.log.info("Created User", newUser);
            return rep.status(201).send(newUser);
        } catch (err) {
            req.log.error(err, "Failed to create new user");
            return rep.status(500).send({ message: "Internal Server Error" });
        }
    });

    // User Update  route
    app.put<{ Body: ICreateUserBody }>("/users", async (req, rep) => {
        const { name, email } = req.body;

        try {
            const userToUpdate = await req.em.findOne(User, { email });
            if (!userToUpdate) {
                return rep.status(404).send({ message: "User not found" });
            }
            userToUpdate.name = name;
            await req.em.flush();
            req.log.info("Updated User", userToUpdate);
            return rep.send(userToUpdate);
        } catch (err) {
            req.log.error(err, "Failed to update user");
            return rep.status(500).send({ message: "Internal Server Error" });
        }
    });

    // Deleteing User route
    app.delete<{ Body: { email: string } }>("/user", async (req, rep) => {
        const { email } = req.body;
        try {
            const userToDelete = await req.em.findOne(User, { email });
            if (!userToDelete) {
                return rep.status(404).send({ message: "User not found" });
            }
            await req.em.removeAndFlush(userToDelete);
            req.log.info("Deleted User", userToDelete);
            return rep.send({ message: "User deleted successfully" });
        } catch (err) {
            req.log.error(err, "Failed to delete user");
            return rep.status(500).send({ message: "Internal Server Error" });
        }
    });
}

export default Routes;
