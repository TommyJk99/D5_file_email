import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import list from "express-list-endpoints";
import apiRouter from "./routers/apiRouter.js";
import { genericError } from "./middlewares/genericError.js";

dotenv.config();

const server = express();
const port = 3030;

server.use("/api", apiRouter);
server.use(genericError);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    server.listen(port, () => {
      console.log("😎 Listening at port:", port);
      console.log(list(server));
    });
  })
  .catch(() => {
    console.log("Errore nella connessione al DB");
  });
