import express from "express";
import cadastroRouter from './cadastroRoute';
import indexRouter from './indexRoute';
import listaUsuariosRouter from "./listaUsuariosRoute";
import procuraUsuarioRouter from "./procuraUsuarioRoute";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter);
app.use('/', cadastroRouter);
app.use('/', listaUsuariosRouter);
app.use('/', procuraUsuarioRouter);

export default app;