import express, { Request, Response } from "express";
import { CarModel } from "../database/Model/cars.model";

export const carController = {
  async index(req: Request, res: Response): Promise<Response> {
    try {
      let cars = await CarModel.find();
      return res.status(200).json(cars);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      let car = await CarModel.findById(id);
      if (!car) res.status(404).json({ msg: "cant find this car!" });
      return res.status(200).json(car);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //   async findByModel(req: Request, res: Response): Promise<Response> {
  //     try {
  //       const { name } = req.params;
  //       let cars = await CarModel.find();

  //       return res.status(200).json(car);
  //     } catch (err) {
  //       console.log(err);
  //       return res.status(500).json(err);
  //     }
  //   },

  async create(req: Request, res: Response): Promise<Response> {
    try {
      let car = await CarModel.create(req.body);

      return res.status(200).json(car);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const newcar = await CarModel.findOneAndUpdate(
        { _id: id },
        {
          ...req.body,
        },
        { runValidators: true, new: true }
      );

      return res.status(200).json(newcar);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deletedcar = await CarModel.deleteOne({ _id: id });

      return res.status(200).json(deletedcar);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
