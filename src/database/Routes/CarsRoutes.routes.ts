import { Router } from "express";
import { carController } from "../../controllers/carController";
import { CarModel } from "../Model/cars.model";

const CarsRouter = Router();

CarsRouter.get("/cars", carController.index);

CarsRouter.get("/car/:id", carController.findById);

// CarsRouter.get("/car_model/:model", carController.findByModel);

CarsRouter.post("/create_car", carController.create);

CarsRouter.put("/edit_car/:id", carController.update);

CarsRouter.delete("/delete_car/:id", carController.delete);

export { CarsRouter };
