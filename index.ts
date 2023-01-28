import express, { Request, Response } from 'express';

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;
const HOST: string = process.env.HOST || 'localhost';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Express+TypeScript world!');
});

app.listen(PORT, async () => {
    console.log(`[server] Server is Running... http://${HOST}:${PORT}`);
});