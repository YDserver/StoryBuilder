import { cn } from "@/lib/utils";

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
}

export function SceneCard({
  scene,
  variant = "single",
  className,
}: SceneCardProps) {
  if (variant === "full") {
    return (
      <div className={cn("space-y-6", className)}>
        <h3 className="text-2xl font-bold text-white">{scene.title}</h3>

        <div className="aspect-video bg-dark-lighter rounded-xl overflow-hidden">
          <img
            src={scene.image}
            alt={scene.title}
            className="w-full h-full object-cover"
          />
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
      <div className="aspect-video bg-dark-lighter rounded-xl overflow-hidden">
        <img
          src={scene.image}
          alt={scene.title}
          className="w-full h-full object-cover"
        />
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
