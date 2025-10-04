import express from "express";
import "dotenv/config";
import { devLogger } from "./middlewares/morganLogger.js";

const port = process.env.PORT;

const app = express();

app.use(devLogger);

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
