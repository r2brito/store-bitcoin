import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';

import express, { Request, Response, NextFunction } from "express";

// Importing routes
import routes from "./routes";

import '@shared/container';
import { AppDataSource } from '../typeorm/database/data-source';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(express.json());

app.use(routes);

// Error handling middleware
app.use(
  (err: Error, _req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    // eslint-disable-next-line no-console
    console.log(err);

    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);

const PORT = process.env.PORT || 3000;

(async () => {
  console.log("Initializing database connection...");
  await AppDataSource.initialize().catch((err) => {
    console.error("Error connecting to the database: ", err);
    process.exit(1); // Encerre o processo se não conseguir conectar
  });

  console.log("Database connected successfully!");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
