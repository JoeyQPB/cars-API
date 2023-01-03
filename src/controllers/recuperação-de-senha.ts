import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import crypto from "crypto";
import { transport } from "../modules/mailer";
import { UserModel } from "../database/Model/user.model";

dotenv.config();

export const recuperacaoDeSenhaController = {
  async recSenha(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body;

      if (!(await UserModel.findOne({ email: email })))
        return res.status(404).json({ msg: "Email não encontrado" });

      const token = crypto.randomBytes(12).toString("hex");

      const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
      const tokenHash = await bcrypt.hash(token, salt);

      await UserModel.findOneAndUpdate(
        { email: email },
        {
          passwordHash: tokenHash,
        }
      );

      transport.sendMail(
        {
          to: email,
          from: `Cars API ${process.env.EMAIL_ADDRESS}`,
          subject: "Cars API Nova Senha",
          text: `Sua nova senha é: ${token}`,
          html: `<b> Sua nova senha é: ${token} </b>`,
        },
        (err) => {
          if (err) {
            return res
              .status(400)
              .send({ error: "Não consigo gerar nova senha :(" });
          }
        }
      );

      return res.status(200).json({ msg: `Sua nova senha é: ${token}` });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
