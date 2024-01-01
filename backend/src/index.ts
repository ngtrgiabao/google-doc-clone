import express, { Express, Request, Response } from "express";
import dotnet from "dotenv";
import db from "./db/models";
import router from "./routes";

dotnet.config();

const app: Express = express();
app.use(express.json());
app.use(router);
const port = 8080;

db.sequelize.sync();

app.get("/", (req: Request, res: Response) => {
  res.send("express + typescript server");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
