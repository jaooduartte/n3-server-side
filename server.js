// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import db from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Garante que o body-parser esteja configurado

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
