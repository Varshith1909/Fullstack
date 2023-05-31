import dotenv from "dotenv";
dotenv.config();
import {TsMorphMetadataProvider} from "@mikro-orm/reflection";
import {defineConfig} from "@mikro-orm/postgresql";

export default defineConfig( {
  entities:["./entities/*.js"],
  entitiesTs:[User],
  tsNode: true,
  dbName: process.env.DB_NAME,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  baseDir: "../",
  metadataProvider : TsMorphMetadataProvider
});
