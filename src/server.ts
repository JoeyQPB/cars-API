import express, { Request, Response } from "express";
import mongoose from "mongoose";

import { CarsRouter } from "./database/Routes/CarsRoutes.routes";

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/carsDB")
  .then((data) => {
    console.log(`MongoDB connection Succeded`);
  })
  .catch((err) => {
    console.log(`error in DB connect`, err);
  });

app.use("/", CarsRouter);

app.listen(3333, () => {
  console.log(`server running at port: 3333`);
});
