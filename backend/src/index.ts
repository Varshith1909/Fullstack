import dotenv from 'dotenv';
import app from "./app.js";

dotenv.config();

const port = process.env.BACKEND_PORT || 8082;
const host = process.env.HOST || '0.0.0.0';

app.listen({ port: Number(port), host }, (err, address) => {
  if (err) {
	console.error(err);
	process.exit(1);
  }
  console.log(`Started server at ${address}`);
});
