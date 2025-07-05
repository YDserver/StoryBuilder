import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { updateScene } from "@/lib/api";
import { Textarea } from "@/components/ui/textarea";

interface Scene {
  id: number;
  title: string;
  image: string;
  voiceover: string;
  details: string;
}

interface SceneCardProps {
  scene: Scene;
  variant?: "single" | "full";
  className?: string;
  onUpdate?: (scene: Scene) => void;
  index?: number;
}

export function SceneCard({
  scene,
  variant = "single",
  className,
  onUpdate,
  index,
}: SceneCardProps) {
  const handleReplaceImage = async () => {
    const url = prompt("New image URL", scene.image);
    if (!url) return;
    const updated = await updateScene(scene.id, { image: url });
    scene.image = updated.image;
    onUpdate?.(updated);
  };
  const [title, setTitle] = useState(scene.title);
  const [voiceover, setVoiceover] = useState(scene.voiceover);
  const [details, setDetails] = useState(scene.details);

  useEffect(() => {
    setTitle(scene.title);
    setVoiceover(scene.voiceover);
    setDetails(scene.details);
  }, [scene.id]);

  const saveField = async (data: Partial<Scene>) => {
    const updated = await updateScene(scene.id, data);
    onUpdate?.(updated);
  };
  if (variant === "full") {
    return (
      <div className={cn("space-y-6", className)}>
        <h3 className="text-2xl font-bold text-white">
          Scene {index !== undefined ? index + 1 : scene.id}
        </h3>
        <input
          className="w-full bg-dark-card border border-gray-600 rounded px-2 py-1 text-white"
          value={title}
          placeholder="Scene Name"
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => saveField({ title })}
        />

        <div className="aspect-video bg-dark-lighter rounded-xl overflow-hidden relative">
          <img
            src={scene.image}
            alt={scene.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleReplaceImage}
            className="absolute top-2 right-2 bg-dark-card text-white text-xs px-2 py-1 rounded"
          >
            Replace Image
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-base font-medium text-white mb-3">
              Voiceover Dialogue
            </h4>
            <Textarea
              className="min-h-36 bg-dark-lighter border border-dark-border rounded-xl p-4 text-sm text-white"
              placeholder="Enter voiceover text here..."
              value={voiceover}
              onChange={(e) => setVoiceover(e.target.value)}
              onBlur={() => saveField({ voiceover })}
            />
          </div>

          <div>
            <h4 className="text-base font-medium text-white mb-3">
              Scene Details
            </h4>
            <Textarea
              className="min-h-36 bg-dark-lighter border border-dark-border rounded-xl p-4 text-sm text-white"
              placeholder="Enter scene details here..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              onBlur={() => saveField({ details })}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      <h3 className="text-2xl font-bold text-white">
        Scene {index !== undefined ? index + 1 : scene.id}
      </h3>
      <input
        className="w-full bg-dark-card border border-gray-600 rounded px-2 py-1 text-white"
        value={title}
        placeholder="Scene Name"
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => saveField({ title })}
      />
      <div className="aspect-video bg-dark-lighter rounded-xl overflow-hidden relative">
        <img
          src={scene.image}
          alt={scene.title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={handleReplaceImage}
          className="absolute top-2 right-2 bg-dark-card text-white text-xs px-2 py-1 rounded"
        >
          Replace Image
        </button>
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h4 className="text-base font-medium text-white mb-3">
              Voiceover Dialogue
            </h4>
            <Textarea
              className="min-h-36 bg-dark-lighter border border-dark-border rounded-xl p-4 text-sm text-white"
              placeholder="Enter voiceover text here..."
              value={voiceover}
              onChange={(e) => setVoiceover(e.target.value)}
              onBlur={() => saveField({ voiceover })}
            />
          </div>

          <div>
            <h4 className="text-base font-medium text-white mb-3">
              Scene Details
            </h4>
            <Textarea
              className="min-h-36 bg-dark-lighter border border-dark-border rounded-xl p-4 text-sm text-white"
              placeholder="Enter scene details here..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              onBlur={() => saveField({ details })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
