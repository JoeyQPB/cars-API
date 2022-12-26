import { Schema, model } from "mongoose";

const carSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    version: {
      type: String,
      trim: true,
      default: "1.0.0",
    },
    year: {
      type: Number,
      require: true,
    },
    mileage: {
      type: Number,
      require: true,
    },
    isAutomatic: {
      type: Boolean,
      require: true,
    },
    priceToSell: {
      type: Number,
      require: true,
    },
    creatAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

export const CarModel = model("Car", carSchema);
