import express from "express";
import "dotenv/config";
import pool from "./lib/db.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../docs/swagger.js";

import cookieParser from "cookie-parser";
import cors from "cors"
import { devLogger } from "./middlewares/morganLogger.js";

import authRoutes from "./routes/auth.route.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(devLogger);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/auth", authRoutes);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
  console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});
