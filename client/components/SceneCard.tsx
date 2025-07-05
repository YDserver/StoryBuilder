import { cn } from "@/lib/utils";
import { updateScene } from "@/lib/api";

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
}

export function SceneCard({
  scene,
  variant = "single",
  className,
  onUpdate,
}: SceneCardProps) {
  const handleReplaceImage = async () => {
    const url = prompt("New image URL", scene.image);
    if (!url) return;
    const updated = await updateScene(scene.id, { image: url });
    scene.image = updated.image;
    onUpdate?.(updated);
  };
  if (variant === "full") {
    return (
      <div className={cn("space-y-6", className)}>
        <h3 className="text-2xl font-bold text-white">{scene.title}</h3>

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
            <div className="min-h-36 p-4 bg-dark-lighter border border-dark-border rounded-xl">
              <p className="text-sm text-white leading-relaxed">
                {scene.voiceover}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-base font-medium text-white mb-3">
              Scene Details
            </h4>
            <div className="min-h-36 p-4 bg-dark-lighter border border-dark-border rounded-xl">
              <p className="text-sm text-white leading-relaxed">
                {scene.details}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
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
        <div>
          <h4 className="text-lg font-bold text-white mb-3">Voiceover</h4>
          <p className="text-base text-white leading-relaxed">
            {scene.voiceover}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h4 className="text-base font-medium text-white mb-3">
              Voiceover Dialogue
            </h4>
            <div className="min-h-36 p-4 bg-dark-lighter border border-dark-border rounded-xl">
              <p className="text-sm text-white leading-relaxed">
                {scene.voiceover}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-base font-medium text-white mb-3">
              Scene Details
            </h4>
            <div className="min-h-36 p-4 bg-dark-lighter border border-dark-border rounded-xl">
              <p className="text-sm text-white leading-relaxed">
                {scene.details}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
