import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotnet from "dotenv";
import db from "./db/models";
import router from "./routes";
import errorHandler from "./middleware/error-handler";

dotnet.config();

const app: Express = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);
app.use(router);
app.use(errorHandler);
const port = 8080;

db.sequelize.sync();

// app.get("/", (req: Request, res: Response) => {
//   res.send("express + typescript server");
// });
//
// app.listen(port, () => {
//   console.log(`server running on port ${port}`);
// });

export default app;
