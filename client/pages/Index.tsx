import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Plus } from "lucide-react";
import { Header, ProjectHeader } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { SceneCard } from "@/components/SceneCard";

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
  {
    id: 4,
    title: "Scene 4",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/08011607c6a0e23896437034e591fad03111f03b?width=800",
    voiceover:
      'Narrator: "The path ahead was treacherous, but each step brought her closer to uncovering the ancient secrets that lay hidden."',
    details:
      "Wide shot of the challenging terrain ahead. Camera movement suggests the difficult journey to come.",
  },
  {
    id: 5,
    title: "Scene 5",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/46e4b669b657fa837e660978a7867318f63eadd8?width=800",
    voiceover:
      'Narrator: "And so began the greatest adventure of her lifetime, one that would test her courage, wisdom, and the strength of her heart."',
    details:
      "Epic establishing shot showing the vast world ahead. Final scene sets up the grand scope of the adventure to come.",
  },
];

export default function Index() {
  const navigate = useNavigate();
  const [scenes, setScenes] = useState<Scene[]>(mockScenes);
  const [selectedScene, setSelectedScene] = useState<number>(1);
  const [showFullView, setShowFullView] = useState<boolean>(false);

  const currentScene =
    scenes.find((scene) => scene.id === selectedScene) || scenes[0];

  const handleExportPDF = () => {
    navigate("/pdf-preview");
  };

  const handleAddScene = () => {
    const newScene: Scene = {
      id: Date.now(),
      title: `Scene ${scenes.length + 1}`,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/08011607c6a0e23896437034e591fad03111f03b?width=800",
      voiceover: "Enter voiceover text here...",
      details: "Enter scene details here...",
    };
    setScenes([...scenes, newScene]);
    setSelectedScene(newScene.id);
  };

  return (
    <div className="min-h-screen bg-dark font-space-grotesk">
      <Header onExportPDF={handleExportPDF} />

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-73px)]">
        {/* Desktop: Sidebar, Mobile: Top navigation */}
        <div
          className={`${showFullView ? "hidden lg:block" : "block"} lg:w-80 lg:flex-shrink-0`}
        >
          {!showFullView && (
            <div className="lg:hidden p-4 border-b border-gray-600 bg-dark">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                    <span>Projects</span>
                    <span>/</span>
                    <span className="text-white">Project Title</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Project Title
                  </h2>
                  <p className="text-sm text-gray-400">
                    Last edited 2 days ago
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="lg:hidden p-4 bg-dark border-b border-gray-600">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Scenes</h3>
              <button
                onClick={handleExportPDF}
                className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-dark text-sm font-bold rounded-xl hover:bg-opacity-90"
              >
                <Download className="w-4 h-4" />
                Export PDF
              </button>
            </div>
          </div>

          <Sidebar
            scenes={scenes}
            selectedScene={selectedScene}
            onSceneSelect={setSelectedScene}
            onAddScene={handleAddScene}
            className="lg:min-h-full"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ProjectHeader
            onExportPDF={handleExportPDF}
            className="hidden lg:block"
          />

          {/* Scene Content */}
          <div className="flex-1 overflow-y-auto">
            {showFullView ? (
              // Full vertical view of all scenes
              <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 space-y-12">
                {scenes.map((scene) => (
                  <SceneCard key={scene.id} scene={scene} variant="full" />
                ))}

                {/* Add Scene Button */}
                <div className="flex justify-center pt-8">
                  <button
                    onClick={handleAddScene}
                    className="flex items-center gap-2 px-6 py-3 bg-dark-card border border-gray-600 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add New Scene
                  </button>
                </div>
              </div>
            ) : (
              // Single scene view
              <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">
                    {currentScene.title}
                  </h3>
                  <button
                    onClick={() => setShowFullView(!showFullView)}
                    className="lg:hidden text-sm text-brand-blue hover:text-blue-300"
                  >
                    View All Scenes
                  </button>
                </div>

                <SceneCard scene={currentScene} variant="single" />

                {/* Add Scene Button */}
                <div className="flex justify-center mt-8 pt-8 border-t border-gray-600">
                  <button
                    onClick={handleAddScene}
                    className="flex items-center gap-2 px-6 py-3 bg-dark-card border border-gray-600 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add New Scene
                  </button>
                </div>
              </div>
            )}

            {/* Credits */}
            <div className="mt-8 py-6 border-t border-gray-600 text-center">
              <p className="text-sm text-gray-500">
                Designed with love by{" "}
                <span className="text-brand-blue font-medium">
                  yantramayaa designs
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
