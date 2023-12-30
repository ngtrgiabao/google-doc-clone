import express, { Express, Request, Response } from "express";
import dotnet from "dotenv";
import { env } from "process";
import db from "./db/models";

dotnet.config();

const app: Express = express();
app.use(express.json());
const port = 8080;

db.sequelize.sync();

app.get("/", (req: Request, res: Response) => {
  res.send("express + typescript server");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
