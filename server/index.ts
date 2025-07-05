import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  getScenes,
  createScene,
  updateScene,
  deleteScene,
} from "./routes/scenes";
import { generatePdf } from "./routes/pdf";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Scene routes
  app.get("/api/scenes", getScenes);
  app.post("/api/scenes", createScene);
  app.put("/api/scenes/:id", updateScene);
  app.delete("/api/scenes/:id", deleteScene);

  // PDF export
  app.post("/api/pdf", generatePdf);

  return app;
}
