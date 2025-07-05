import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, ArrowLeft, FileText } from "lucide-react";

interface Scene {
  id: number;
  title: string;
  image: string;
  voiceover: string;
  details: string;
}

const mockScenes: Scene[] = [
  {
    id: 1,
    title: "Scene 1",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/08011607c6a0e23896437034e591fad03111f03b?width=800",
    voiceover:
      'Narrator: "In the heart of the enchanted forest, where ancient trees whispered secrets to the wind, lived a young adventurer named Elara. Her quest began with a mysterious map, promising untold wonders and hidden dangers."',
    details:
      "The opening scene establishes our protagonist in a mystical forest setting. Camera slowly pans through towering trees before focusing on Elara examining an ancient map.",
  },
  {
    id: 2,
    title: "Scene 2",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/46e4b669b657fa837e660978a7867318f63eadd8?width=800",
    voiceover:
      'Narrator: "As she stepped deeper into the unknown, strange creatures began to emerge from the shadows, their glowing eyes watching her every move."',
    details:
      "Transition to darker atmosphere as mysterious creatures appear. Focus on creature eyes glowing in the darkness to build tension.",
  },
  {
    id: 3,
    title: "Scene 3",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/012bce2ea8be7c3e4df223c90c2a6d5ca721fdee?width=800",
    voiceover:
      'Narrator: "But Elara was not afraid. She had trained for this moment her entire life, and her courage would light the way forward."',
    details:
      "Close-up on Elara's determined expression. Lighting shifts to more hopeful as she prepares for the journey ahead.",
  },
];

export default function PDFPreview() {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simulate PDF generation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In a real implementation, this would generate and download the actual PDF
    const link = document.createElement("a");
    link.href = "#"; // Would be the PDF blob URL
    link.download = "storyboard-preview.pdf";
    // link.click();

    setIsDownloading(false);
    alert("PDF would be downloaded here");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-space-grotesk">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Project
            </button>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-600" />
              <h1 className="text-xl font-bold text-gray-800">PDF Preview</h1>
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
          >
            <Download className="w-4 h-4" />
            {isDownloading ? "Generating..." : "Download PDF"}
          </button>
        </div>
      </header>

      {/* PDF Preview Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* PDF Container */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* PDF Header */}
          <div className="bg-gray-800 text-white p-8 text-center">
            <h1 className="text-3xl font-bold mb-2">
              Enchanted Forest Adventure
            </h1>
            <p className="text-gray-300">Storyboard Presentation</p>
            <div className="mt-4 text-sm text-gray-400">
              Generated on {new Date().toLocaleDateString()}
            </div>
          </div>

          {/* PDF Content */}
          <div className="p-8 space-y-12">
            {mockScenes.map((scene, index) => (
              <div key={scene.id} className="page-break-inside-avoid">
                {/* Scene Header */}
                <div className="border-b border-gray-200 pb-4 mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    {scene.title}
                  </h2>
                </div>

                {/* Scene Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Scene Image */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                      Scene Visual
                    </h3>
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border">
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
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">
                        Scene Details
                      </h3>
                      <div className="p-4 bg-gray-50 rounded-lg border">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {scene.details}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Voiceover */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Voiceover Script
                  </h3>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-gray-800 leading-relaxed italic">
                      {scene.voiceover}
                    </p>
                  </div>
                </div>

                {/* Separator for next scene */}
                {index < mockScenes.length - 1 && (
                  <div className="mt-12 border-t border-gray-300"></div>
                )}
              </div>
            ))}

            {/* PDF Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center">
              <div className="text-sm text-gray-500 space-y-2">
                <p>Total Scenes: {mockScenes.length}</p>
                <p>
                  Designed with love by{" "}
                  <span className="text-blue-600 font-medium">
                    yantramayaa designs
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            This is a preview of how your PDF will look when exported.
          </p>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
          >
            <Download className="w-5 h-5" />
            {isDownloading ? "Generating PDF..." : "Download PDF"}
          </button>
        </div>
      </div>
    </div>
  );
}
