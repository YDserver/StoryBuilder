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
  const buffer = await document.toBuffer();
  res.end(buffer);
};
