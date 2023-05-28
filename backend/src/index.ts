/* eslint-disabled */
// @ts-nocheck
import * as dotenv from 'dotenv';
dotenv.config();
import {Nastify} from "./server.js";



let app = Nastify();

app.listen(8081, () =>{
	console.log("Server listening on port 8081");
})
