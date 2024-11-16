import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';

import express, { Request, Response, NextFunction } from "express";

// Importing routes
import routes from "./routes";
import { AppDataSource } from '../typeorm/database/data-source';

const app = express();

app.use(express.json());

app.use(routes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err.message });
});

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
