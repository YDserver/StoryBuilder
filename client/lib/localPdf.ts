import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Scene } from '@shared/api';

export async function generatePdfLocal(scenes: Scene[], remarks = ''): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Title Page
  let page = pdfDoc.addPage();
  const { height } = page.getSize();
  page.drawText('Storyboard Presentation', {
    x: 50,
    y: height - 60,
    size: 26,
    font,
    color: rgb(0, 0, 0),
  });
  if (remarks) {
    page.drawText(remarks, {
      x: 50,
      y: height - 90,
      size: 12,
      font,
    });
  }

  for (const [idx, scene] of scenes.entries()) {
    page = pdfDoc.addPage();
    const { height: h } = page.getSize();
    page.drawText(`${idx + 1}. ${scene.title}`, {
      x: 50,
      y: h - 40,
      size: 20,
      font,
    });

    if (scene.image) {
      try {
        let imageBytes: Uint8Array | undefined;
        if (scene.image.startsWith('data:')) {
          const base64 = scene.image.split(',', 2)[1];
          imageBytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
        } else {
          const r = await fetch(scene.image);
          const buf = await r.arrayBuffer();
          imageBytes = new Uint8Array(buf);
        }
        if (imageBytes) {
          const isPng = scene.image.startsWith('data:image/png') || scene.image.endsWith('.png');
          const img = isPng
            ? await pdfDoc.embedPng(imageBytes)
            : await pdfDoc.embedJpg(imageBytes);
          const dims = img.scaleToFit(500, 280);
          page.drawImage(img, {
            x: 50,
            y: h - 80 - dims.height,
            width: dims.width,
            height: dims.height,
          });
        }
      } catch {
        // ignore image errors
      }
    }

    page.drawText(scene.details, {
      x: 50,
      y: 80,
      size: 12,
      font,
    });
    page.drawText(scene.voiceover, {
      x: 50,
      y: 60,
      size: 10,
      font,
    });
  }

  page = pdfDoc.addPage();
  page.drawText(`Total Scenes: ${scenes.length}`, {
    x: 50,
    y: page.getHeight() - 60,
    size: 12,
    font,
  });
  page.drawText('Designed with love by yantramayaa designs', {
    x: 50,
    y: page.getHeight() - 80,
    size: 10,
    font,
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}
