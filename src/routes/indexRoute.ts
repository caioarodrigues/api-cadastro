import { Router, Request, Response } from "express";

const indexRouter = Router();

indexRouter.get('/', (req: Request, res: Response) => {
    const msg: {} = {
        conteudo: 'Olá, mundo!'
    }

    res.json(msg);
});

export default indexRouter;