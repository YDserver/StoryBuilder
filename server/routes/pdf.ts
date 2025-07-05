import { RequestHandler } from "express";
import PDFDocument from "pdfkit";
import { Scene } from "@shared/api";
import fetch from "node-fetch";

export const generatePdf: RequestHandler = async (req, res) => {
  const scenes: Scene[] = Array.isArray(req.body?.scenes)
    ? req.body.scenes
    : [];
  const remarks: string = typeof req.body?.remarks === "string" ? req.body.remarks : "";
  const doc = new PDFDocument({ autoFirstPage: false });

  res.status(200);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=storyboard.pdf");

  doc.pipe(res);

  // Title page
  doc.addPage();
  doc.fontSize(26).text("Storyboard Presentation", { align: "center" });
  if (remarks) {
    doc.moveDown();
    doc.fontSize(12).text(remarks, { align: "center" });
  }

  for (const [idx, scene] of scenes.entries()) {
    doc.addPage();
    doc.fontSize(20).text(`${idx + 1}. ${scene.title}`);
    doc.moveDown();

    if (scene.image) {
      try {
        if (scene.image.startsWith("data:")) {
          const base64 = scene.image.split(",", 2)[1];
          const buffer = Buffer.from(base64, "base64");
          doc.image(buffer, { fit: [500, 280], align: "center" });
        } else {
          const r = await fetch(scene.image);
          const arr = await r.arrayBuffer();
          doc.image(Buffer.from(arr), { fit: [500, 280], align: "center" });
        }
        doc.moveDown();
      } catch {
        // ignore image errors
      }
    }

    doc.fontSize(12).text(scene.details);
    doc.moveDown();
    doc.fontSize(10).fillColor("gray").text(scene.voiceover, { oblique: true });
    doc.fillColor("black");
  }

  doc.addPage();
  doc.fontSize(12).text(`Total Scenes: ${scenes.length}`, { align: "center" });
  doc.moveDown();
  doc.fontSize(10).text("Designed with love by yantramayaa designs", {
    align: "center",
  });

  doc.end();
};
