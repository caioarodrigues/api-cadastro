import app from "./routes/routes";

const porta: number = 3000;

app.listen(porta, () => {
    console.log(`Backend executando em http://localhost:${porta}`);
});
