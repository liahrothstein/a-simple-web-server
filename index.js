import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './routes/router.js';
import errorMiddleware from './middlewares/error.middleware.js';

dotenv.config();
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

app.use(errorMiddleware)

const startApp = async () => {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log(`The Server is enabled on ${PORT} port`));
    } catch (e) {
        console.log(e)
    }
}

startApp()