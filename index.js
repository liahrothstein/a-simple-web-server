import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import router from './routes/router.js';

const DB_URL = config.get('dbUrl');
const PORT = process.env.PORT || config.get('serverPort');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

const startApp = async () => {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log(`The Server is enabled on ${PORT} port`));
    } catch (e) {
        console.log(e)
    }
}

startApp()