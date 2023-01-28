import "reflect-metadata"
import express, { Request, Response } from 'express';
import { handleError } from './src/middleware/errorHandler';
import { CustomError } from './src/middleware/error/customError';
import morganLog from './src/middleware/logger/morgan';
import logger from './src/middleware/logger/winston';
import { AppDataSource } from './src/database/config/dataSource';

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;
const HOST: string = process.env.HOST || 'localhost';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morganLog);

//typeORM 설정 import
AppDataSource.initialize()
    .then(async () => {
        logger.info("Data Source has been initialized!");
    })
    .catch((error) => {
        logger.error("Error during Data Source initialization", error)
    });

app.get('/', (req: Request, res: Response) => {
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
    console.log(`[server] Server is Running... http://${HOST}:${PORT}`);
});