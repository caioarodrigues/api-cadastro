import app from "./routes/routes";
import cors from 'cors';

const porta: number = 3000;

app.use(cors());

app.listen(porta, () => {
    console.log(`Backend executando em http://localhost:${porta}`);
});
