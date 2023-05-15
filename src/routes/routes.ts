import express from "express";
import cadastroRouter from './cadastroRoute';
import indexRouter from './indexRoute';
import listaUsuariosRouter from "./listaUsuariosRoute";
import procuraUsuarioRoute from "./procuraUsuarioRoute";
import editaUsuarioRouter from "./editaUsuarioRoute";
import removeUsuarioRouter from "./removeUsuarioRoute";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter);
app.use('/', cadastroRouter);
app.use('/', listaUsuariosRouter);
app.use('/', procuraUsuarioRoute);
app.use('/', editaUsuarioRouter);
app.use('/', removeUsuarioRouter);

export default app;