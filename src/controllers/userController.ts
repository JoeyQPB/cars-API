import express, { Request, Response } from "express";
import { UserModel } from "../database/Model/user.model";
import { generateToken } from "../config/jwt.config";
import bcrypt from "bcrypt";

const SALT_ROUNDS: number = 10;

export const userController = {
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { password, email } = req.body;

      const userExists = await UserModel.find({ email: email });

      if (userExists) {
        return res.status(400).json({ msg: "Email já cadastrado" });
      }

      if (!password || !email) {
        return res.status(400).json({ msg: "Preencha todos os campos" });
      }

      const salt: string = await bcrypt.genSalt(SALT_ROUNDS);
      const hashedPassword: string = await bcrypt.hash(password, salt);

      const newUser = await UserModel.create({
        ...req.body,
        passwordHash: hashedPassword,
      });

      const { passwordHash: _, ...user } = newUser;

      return res.status(201).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async loginUser(req: Request, res: Response): Promise<Response> {
    try {
      const { password, email } = req.body;

      const user = await UserModel.findOne({ email: email });

      if (!user) {
        return res.status(404).json({ msg: "Email ou senha invalidos." });
      }

      if (await bcrypt.compare(password, user.passwordHash)) {
        const token = generateToken(user);

        return res.status(200).json({
          user: {
            name: user.name,
            email: user.email,
            _id: user._id,
            role: user.role,
          },
          token: token,
          CarsCreated: user.CreatedCar,
        });
      } else {
        return res.status(401).json({ msg: "Email ou senha invalidos." });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
