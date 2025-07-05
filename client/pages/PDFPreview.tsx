import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Download, ArrowLeft, FileText } from "lucide-react";
import { Scene } from "@shared/api";
import { fetchScenes } from "@/lib/api";
import { generatePdfLocal } from "@/lib/localPdf";

export default function PDFPreview() {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    fetchScenes().then(setScenes);
  }, []);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const blob = await generatePdfLocal(scenes, remarks);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "storyboard.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to generate PDF");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-dark font-space-grotesk">
      {/* Header */}
      <header className="bg-dark-card border-b border-gray-600 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Project
            </button>
            <div className="w-px h-6 bg-gray-600"></div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-300" />
              <h1 className="text-xl font-bold text-white">PDF Preview</h1>
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 px-6 py-2 bg-brand-blue text-dark text-sm font-bold rounded-lg hover:bg-opacity-90 disabled:opacity-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            {isDownloading ? "Generating..." : "Download PDF"}
          </button>
        </div>
      </header>

      {/* PDF Preview Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* PDF Container */}
        <div className="bg-dark-card border border-gray-600 rounded-lg overflow-hidden">
          {/* PDF Header */}
          <div className="bg-dark-lighter text-white p-8 text-center space-y-4">
            <h1 className="text-3xl font-bold">Storyboard Presentation</h1>
            <textarea
              className="w-full bg-dark-card border border-gray-600 rounded p-2 text-sm text-white"
              placeholder="Remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>

          {/* PDF Content */}
          <div className="p-8 space-y-12">
            {scenes.map((scene, index) => (
              <div key={scene.id} className="page-break-inside-avoid">
                {/* Scene Header */}
                <div className="border-b border-gray-600 pb-4 mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="bg-brand-blue text-dark w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    {scene.title}
                  </h2>
                </div>

                {/* Scene Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Scene Image */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Scene Visual
                    </h3>
                    <div className="aspect-video bg-dark-lighter rounded-lg overflow-hidden border border-gray-600">
                      <img
                        src={scene.image}
                        alt={scene.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Scene Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">
                        Scene Details
                      </h3>
                      <div className="p-4 bg-dark-lighter rounded-lg border border-gray-600">
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {scene.details}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Voiceover */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Voiceover Script
                  </h3>
                  <div className="p-4 bg-dark-lighter border border-gray-600 rounded-lg">
                    <p className="text-sm text-gray-300 leading-relaxed italic">
                      {scene.voiceover}
                    </p>
                  </div>
                </div>

                {/* Separator for next scene */}
                {index < scenes.length - 1 && (
                  <div className="mt-12 border-t border-gray-600"></div>
                )}
              </div>
            ))}

            {/* PDF Footer */}
            <div className="mt-16 pt-8 border-t border-gray-600 text-center">
              <div className="text-sm text-gray-400 space-y-2">
                <p>Total Scenes: {scenes.length}</p>
                <p>
                  Designed with love by{" "}
                  <span className="text-brand-blue font-medium">
                    yantramayaa designs
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">
            This is a preview of how your PDF will look when exported.
          </p>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="inline-flex items-center gap-2 px-8 py-3 bg-brand-blue text-dark text-sm font-bold rounded-lg hover:bg-opacity-90 disabled:opacity-50 transition-colors"
          >
            <Download className="w-5 h-5" />
            {isDownloading ? "Generating PDF..." : "Download PDF"}
          </button>
        </div>
      </div>
    </div>
  );
}
