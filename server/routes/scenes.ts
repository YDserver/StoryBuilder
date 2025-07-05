import { RequestHandler } from "express";
import fs from "fs";
import path from "path";
import { Scene, CreateScenePayload } from "@shared/api";

const dataPath = path.join(__dirname, "../data/scenes.json");

function readScenes(): Scene[] {
  if (!fs.existsSync(dataPath)) return [];
  const raw = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(raw) as Scene[];
}

function writeScenes(scenes: Scene[]) {
  fs.writeFileSync(dataPath, JSON.stringify(scenes, null, 2));
}

export const getScenes: RequestHandler = (_req, res) => {
  const scenes = readScenes();
  res.json(scenes);
};

export const createScene: RequestHandler = (req, res) => {
  const scenes = readScenes();
  const payload = req.body as CreateScenePayload;
  const newScene: Scene = { id: Date.now(), ...payload };
  scenes.push(newScene);
  writeScenes(scenes);
  res.status(201).json(newScene);
};

export const updateScene: RequestHandler = (req, res) => {
  const scenes = readScenes();
  const id = Number(req.params.id);
  const index = scenes.findIndex((s) => s.id === id);
  if (index === -1) return res.status(404).json({ error: "Not found" });
  scenes[index] = { ...scenes[index], ...req.body };
  writeScenes(scenes);
  res.json(scenes[index]);
};

export const deleteScene: RequestHandler = (req, res) => {
  const scenes = readScenes();
  const id = Number(req.params.id);
  const filtered = scenes.filter((s) => s.id !== id);
  if (filtered.length === scenes.length) {
    return res.status(404).json({ error: "Not found" });
  }
  writeScenes(filtered);
  res.status(204).end();
};
