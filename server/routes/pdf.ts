import { RequestHandler } from "express";
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import { Scene } from "@shared/api";

const dataPath = path.join(__dirname, "../data/scenes.json");

function readScenes(): Scene[] {
  if (!fs.existsSync(dataPath)) return [];
  return JSON.parse(fs.readFileSync(dataPath, "utf-8"));
}

export const generatePdf: RequestHandler = (_req, res) => {
  const doc = new PDFDocument();
  const scenes = readScenes();

  res.status(200);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=storyboard.pdf");

  doc.pipe(res);

  doc.fontSize(20).text("Storyboard", { align: "center" });
  doc.moveDown();

  scenes.forEach((scene, idx) => {
    doc.fontSize(16).text(`${idx + 1}. ${scene.title}`);
    doc.moveDown(0.5);
    doc.fontSize(12).text(scene.details);
    doc.moveDown(0.5);
    doc.fontSize(10).text(scene.voiceover);
    doc.moveDown();
  });

  doc.end();
};
