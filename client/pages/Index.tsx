import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Download, Plus } from "lucide-react";
import { Header, ProjectHeader } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { SceneCard } from "@/components/SceneCard";
import { Scene, CreateScenePayload } from "@shared/api";
import { fetchScenes, addScene } from "@/lib/api";


interface Project {
  id: number;
  title: string;
  description: string;
  lastEdited: string;
  sceneCount: number;
  thumbnail: string;
}

export default function Index() {
  const { id } = useParams<{ id: string }>();
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [selectedScene, setSelectedScene] = useState<number | null>(null);
  const [showFullView, setShowFullView] = useState<boolean>(false);
  const [project, setProject] = useState<Project | null>(null);

  const currentScene = scenes.find((scene) => scene.id === selectedScene) || null;

  useEffect(() => {
    fetchScenes().then((data) => {
      setScenes(data);
      if (data.length) setSelectedScene(data[0].id);
    });
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('projects');
    if (!stored) return;
    try {
      const list = JSON.parse(stored) as Project[];
      const found = list.find((p) => p.id === Number(id));
      if (found) setProject(found);
    } catch {
      // ignore parse errors
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem('scenes', JSON.stringify(scenes));
  }, [scenes]);

  const handleExportPDF = () => {
    window.location.href = "/pdf-preview";
  };

  const handleAddScene = async () => {
    const payload: CreateScenePayload = {
      title: `Scene ${scenes.length + 1}`,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/08011607c6a0e23896437034e591fad03111f03b?width=800",
      voiceover: "Enter voiceover text here...",
      details: "Enter scene details here...",
    };
    const created = await addScene(payload);
    setScenes([...scenes, created]);
    setSelectedScene(created.id);
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
                    <span className="text-white">{project?.title || 'Project Title'}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {project?.title || 'Project Title'}
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
            title={project?.title}
            className="hidden lg:block"
          />

          {/* Scene Content */}
          <div className="flex-1 overflow-y-auto">
            {scenes.length === 0 ? (
              <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 text-center">
                <p className="text-gray-400 mb-4">No scenes yet</p>
                <button
                  onClick={handleAddScene}
                  className="flex items-center gap-2 px-6 py-3 bg-dark-card border border-gray-600 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add First Scene
                </button>
              </div>
            ) : showFullView ? (
              // Full vertical view of all scenes
              <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 space-y-12">
                {scenes.map((scene, idx) => (
                  <SceneCard
                    key={scene.id}
                    scene={scene}
                    variant="full"
                    index={idx}
                    onUpdate={(s) => {
                      const copy = [...scenes];
                      copy[idx] = s;
                      setScenes(copy);
                    }}
                  />
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

                <SceneCard
                  scene={currentScene}
                  variant="single"
                  index={scenes.findIndex((sc) => sc.id === currentScene.id)}
                  onUpdate={(s) => {
                    const idx = scenes.findIndex((sc) => sc.id === s.id);
                    if (idx !== -1) {
                      const copy = [...scenes];
                      copy[idx] = s;
                      setScenes(copy);
                    }
                  }}
                />

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
