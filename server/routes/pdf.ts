import { RequestHandler } from "express";
import PDFDocument from "pdfkit";
import { Scene } from "@shared/api";

export const generatePdf: RequestHandler = (req, res) => {
  const scenes: Scene[] = Array.isArray(req.body?.scenes)
    ? req.body.scenes
    : [];
  const doc = new PDFDocument();

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
