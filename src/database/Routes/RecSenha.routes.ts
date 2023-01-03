import { Router } from "express";
import { recuperacaoDeSenhaController } from "../../controllers/recuperação-de-senha";

const recSenhaRouter = Router();

recSenhaRouter.post("/recuperar_senha", recuperacaoDeSenhaController.recSenha);

export { recSenhaRouter };
