import { Router } from "express";
import { carController } from "../../controllers/carController";

const CarsRouter = Router();

CarsRouter.get("/cars", carController.index);

CarsRouter.get("/car/:id", carController.findById);

CarsRouter.post("/create_car", carController.create);

CarsRouter.put("/edit_car/:id", carController.update);

CarsRouter.delete("/delete_car/:id", carController.delete);

export { CarsRouter };
