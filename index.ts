import express, { Request, Response } from 'express';
import { handleError } from './src/middleware/errorHandler';
import { CustomError } from './src/middleware/error/customError';
import morganLog from './src/middleware/logger/morgan';
import logger from './src/middleware/logger/winston';
import mongoose, { Schema, model, connect } from 'mongoose';
import { User } from './src/database/models/userSchema';

require('dotenv').config();

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;
const HOST: string = process.env.HOST || 'localhost';
const MONGO_URI: string = process.env.MONGO_URI || 'mongodb://localhost:27017/example';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganLog);

mongoose.set('strictQuery', true);
// CONNECT TO MONGODB SERVER
async function mongoosConnetion() {
    await mongoose.connect(MONGO_URI)
}

mongoosConnetion()
    .then(() => logger.info(`[moongoose] Successfully connected to mongodb...`))
    .catch(err => logger.error(err));


app.get('/', async (req: Request, res: Response) => {

    const user = new User({
        name: '홍길동',
        email: 'test@test.com',
        password: '12345',
    });

    await user.save();

    res.send('Hello Express+TypeScript world!');
});

//잘못된 URL 접근시 에러 발생
app.get('*', (req: Request, res: Response) => {
    logger.error("Page not found")
    throw new CustomError(404, 'We\'re sorry, we couldn\'t find the page you requested.', 'Page not found');
});

//Error Handler 등록
app.use(handleError);

app.listen(PORT, async () => {
    logger.info(`[server] Server is Running... http://${HOST}:${PORT}`);
});