import dotenv from "dotenv";
import app from "./app.js";

// Loading the environment variables
dotenv.config();

// Retriving the server configuration
const port = process.env.BACKEND_PORT || 8082;
const host = process.env.HOST || "0.0.0.0";


function startServer(){
app.listen({ port: Number(port), host }, (err, address) => {
	if (err) {
		console.error('Server failed to start:', err);
		process.exit(1);
	}
	console.log(`Server listening at ${address}`);
});
}

startServer();