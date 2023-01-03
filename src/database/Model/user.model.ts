import { Schema, model, Types } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
    creatAt: {
      type: Date,
      default: Date.now(),
    },
    CreatedCar: [{ type: Types.ObjectId, ref: "Car" }],
  },
  { timestamps: true }
);

export const UserModel = model("User", userSchema);
