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
  await AppDataSource.initialize().catch((err) => {
    console.log("Error connecting to the database: ", err);
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});