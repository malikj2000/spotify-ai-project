import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sequelize } from './models/index.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await sequelize.authenticate();
    console.log("Database connected!");
})
