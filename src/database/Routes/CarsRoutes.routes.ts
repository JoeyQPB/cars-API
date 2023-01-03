import { Router } from "express";
import { carController } from "../../controllers/carController";
import attachCurrentUser from "../../middlewares/attachCurrentUser";
import { isAdmin } from "../../middlewares/idAdmin";
import isAuth from "../../middlewares/isAuth";

const CarsRouter = Router();

CarsRouter.get("/cars", carController.index);

CarsRouter.get("/car/:id", isAuth, attachCurrentUser, carController.findById);

CarsRouter.post(
  "/create_car",
  isAuth,
  attachCurrentUser,
  isAdmin,
  carController.create
);

CarsRouter.put(
  "/edit_car/:id",
  isAuth,
  attachCurrentUser,
  isAdmin,
  carController.update
);

CarsRouter.delete(
  "/delete_car/:id",
  isAuth,
  attachCurrentUser,
  isAdmin,
  carController.delete
);

export { CarsRouter };
