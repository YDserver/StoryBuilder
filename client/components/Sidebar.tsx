import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface Scene {
  id: number;
  title: string;
  image: string;
  voiceover: string;
  details: string;
}

interface SidebarProps {
  scenes: Scene[];
  selectedScene: number;
  onSceneSelect: (sceneId: number) => void;
  onAddScene?: () => void;
  className?: string;
}

export function Sidebar({
  scenes,
  selectedScene,
  onSceneSelect,
  onAddScene,
  className,
}: SidebarProps) {
  return (
    <div
      className={cn("bg-dark border-r border-gray-600 min-h-full", className)}
    >
      <div className="p-4 lg:p-6">
        <div className="space-y-2">
          {scenes.map((scene) => (
            <button
              key={scene.id}
              onClick={() => onSceneSelect(scene.id)}
              className={cn(
                "w-full text-left p-3 rounded-xl transition-colors text-sm font-medium",
                selectedScene === scene.id
                  ? "bg-dark-card text-white"
                  : "text-white hover:bg-dark-card hover:bg-opacity-50",
              )}
            >
              {scene.title}
            </button>
          ))}

          {/* Add Scene Button */}
          {onAddScene && (
            <button
              onClick={onAddScene}
              className="w-full text-left p-3 rounded-xl transition-colors text-sm font-medium text-gray-400 hover:text-white hover:bg-dark-card hover:bg-opacity-50 border border-dashed border-gray-600 hover:border-gray-500"
            >
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Scene
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
