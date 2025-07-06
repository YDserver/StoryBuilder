import { RequestHandler } from "express";
import { Scene } from "@shared/api";
import { pdf } from "@react-pdf/renderer";
import { StoryboardPdf } from "../pdf-template";

export const generatePdf: RequestHandler = async (req, res) => {
  const scenes: Scene[] = Array.isArray(req.body?.scenes)
    ? req.body.scenes
    : [];
  const remarks: string =
    typeof req.body?.remarks === "string" ? req.body.remarks : "";

  res.status(200);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=storyboard.pdf");

  const document = pdf(<StoryboardPdf scenes={scenes} remarks={remarks} />);
  const stream = await document.toBuffer();
  const chunks: Uint8Array[] = [];
  stream.on("data", (chunk) => {
    chunks.push(chunk instanceof Uint8Array ? chunk : new Uint8Array(chunk));
  });
  stream.on("end", () => {
    const buffer = Buffer.concat(chunks);
    res.end(buffer);
  });
  stream.on("error", (err) => {
    console.error(err);
    res.status(500).end("Failed to generate PDF");
  });
};
