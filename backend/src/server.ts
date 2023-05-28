import fs from "fs/promises";
import http, {Server} from "http";
import path from "path";
import {fileURLToPath} from 'url';
import {request} from "./request.js";
import {response} from "./response.js";
import ErrnoException = NodeJS.ErrnoException;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function Nastify(){
	function listen(port = 8081, callback) {
		return http
			.createServer(async (req, res) => {
				request(req);
				response(res);
				
				const indexFile = await fs.readFile(path.resolve(__dirname, "..", "public", "index.html"))
					.catch(err => {
						console.log(err);
						res.setHeader('Content-Type', 'text/html');
						res.writeHead(500);
						return res.end(JSON.stringify(err));
					});
				
				res.setHeader('Content-Type', 'text/html');
				res.writeHead(200);
				return res.end(indexFile);
			})
			.listen({port}, () => {
				if(callback){
					if(typeof callback === 'function') {
						return callback();
					}
					throw new Error('Listen callback needs to be a function');
				}
			});
	}
	return {
		listen
	};
}
