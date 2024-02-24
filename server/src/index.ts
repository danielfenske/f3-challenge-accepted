import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const port = process.env.SERVER_PORT || 9090;

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Example app');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});