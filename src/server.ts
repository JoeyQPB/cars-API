import express from "express";
import mongoose from "mongoose";

import { CarsRouter } from "./database/Routes/CarsRoutes.routes";
import { userRouter } from "./database/Routes/user.routes";
import { SwaggerRouter } from "./database/Routes/swagger.routes";
import { recSenhaRouter } from "./database/Routes/RecSenha.routes";

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

app.use("/cars", CarsRouter);
app.use("/user", userRouter);
app.use("/", recSenhaRouter);
app.use("/doc", SwaggerRouter);

app.listen(3333, () => {
  console.log(`server running at port: 3333`);
});
