import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mainRouter from "./routes/index.router";

dotenv.config();
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(",") || [];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

const port = 4001;

app.use(mainRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  const status = error.status || 500;
  res.status(status).json({
    success: false,
    message: error?.isExpose ? error?.message : "Internal server error",
  });
});

app.listen(port, () => {
  console.log(`⚡️ Server is running on port ${port}`);
});
