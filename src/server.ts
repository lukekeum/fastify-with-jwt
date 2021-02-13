import 'dotenv/config';
import "reflect-metadata";
import { createConnection } from "typeorm"
import app from './app';
import connectionOptions from "./database";

createConnection(connectionOptions).then(() => {
  app.server.log.info("Database connected")
  app.start();
}).catch((err) => {
  console.error(err);
})