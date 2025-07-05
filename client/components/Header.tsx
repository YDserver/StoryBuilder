import { Download, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onExportPDF: () => void;
  className?: string;
}

export function Header({ onExportPDF, className }: HeaderProps) {
  return (
    <header
      className={cn("border-b border-gray-600 px-6 md:px-10 py-3", className)}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Flame className="w-4 h-4 text-white" />
            <h1 className="text-lg font-bold text-white">Storyboarding</h1>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="/dashboard"
            className="text-sm text-white hover:text-gray-300"
          >
            Dashboard
          </a>
          <a href="#" className="text-sm text-white hover:text-gray-300">
            Projects
          </a>
          <a href="#" className="text-sm text-white hover:text-gray-300">
            Templates
          </a>
          <a href="#" className="text-sm text-white hover:text-gray-300">
            Learn
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden md:block px-4 py-2 bg-dark-card text-white text-sm font-bold rounded-xl hover:bg-opacity-80">
            New Project
          </button>
          <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
        </div>
      </div>
    </header>
  );
}

interface ProjectHeaderProps {
  onExportPDF: () => void;
  className?: string;
}

export function ProjectHeader({ onExportPDF, className }: ProjectHeaderProps) {
  return (
    <div className={cn("p-6 border-b border-gray-600", className)}>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 text-base text-gray-400 mb-4">
            <span>Projects</span>
            <span>/</span>
            <span className="text-white">Project Title</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Project Title</h2>
          <p className="text-sm text-gray-400">Last edited 2 days ago</p>
        </div>
        <button
          onClick={onExportPDF}
          className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-dark text-sm font-bold rounded-xl hover:bg-opacity-90"
        >
          <Download className="w-4 h-4" />
          Export PDF
        </button>
      </div>
    </div>
  );
}
