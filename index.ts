import express, { Application } from "express";
import env from "dotenv";
import { db } from "./config/db";
import { mainApp } from "./mainApp";
env.config();

const app: Application = express();

const port: number = parseInt(process.env.PORT!);

mainApp(app);

const server = app.listen(process.env.PORT || port, () => {
  db();
});

process.on("uncaughtException", (err: any) => {
  console.log("Error", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("Error", reason);
  server.close(() => {
    process.exit(1);
  });
});
