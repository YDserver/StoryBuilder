import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Calendar, MoreVertical } from "lucide-react";
import { Header } from "@/components/Header";

interface Project {
  id: number;
  title: string;
  description: string;
  lastEdited: string;
  sceneCount: number;
  thumbnail: string;
}

const mockProjects: Project[] = [
  {
    id: 1,
    title: "Enchanted Forest Adventure",
    description:
      "A mystical journey through an ancient forest with magical creatures",
    lastEdited: "2 days ago",
    sceneCount: 5,
    thumbnail:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/08011607c6a0e23896437034e591fad03111f03b?width=400",
  },
  {
    id: 2,
    title: "Space Explorer Chronicles",
    description: "Epic space adventure across distant galaxies",
    lastEdited: "1 week ago",
    sceneCount: 8,
    thumbnail:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/46e4b669b657fa837e660978a7867318f63eadd8?width=400",
  },
  {
    id: 3,
    title: "Underwater Kingdom",
    description: "Deep sea adventure in the realm of mermaids",
    lastEdited: "2 weeks ago",
    sceneCount: 6,
    thumbnail:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/012bce2ea8be7c3e4df223c90c2a6d5ca721fdee?width=400",
  },
];

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  const handleCreateProject = () => {
    const newProject: Project = {
      id: Date.now(),
      title: "Untitled Project",
      description: "New storyboard project",
      lastEdited: "Just now",
      sceneCount: 0,
      thumbnail:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/08011607c6a0e23896437034e591fad03111f03b?width=400",
    };
    setProjects([newProject, ...projects]);
  };

  return (
    <div className="min-h-screen bg-dark font-space-grotesk">
      <Header onExportPDF={() => {}} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Manage your storyboard projects</p>
          </div>
          <button
            onClick={handleCreateProject}
            className="flex items-center gap-2 px-6 py-3 bg-brand-blue text-dark text-sm font-bold rounded-xl hover:bg-opacity-90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-dark-card border border-gray-600 rounded-xl overflow-hidden hover:border-gray-500 transition-colors"
            >
              <div className="aspect-video bg-dark-lighter">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-white truncate">
                    {project.title}
                  </h3>
                  <button className="text-gray-400 hover:text-white p-1">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {project.lastEdited}
                  </div>
                  <span>{project.sceneCount} scenes</span>
                </div>

                <Link
                  to={`/project/${project.id}`}
                  className="block w-full py-2 px-4 bg-dark-lighter border border-gray-600 text-white text-center text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Open Project
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Credits */}
        <div className="mt-16 pt-8 border-t border-gray-600 text-center">
          <p className="text-sm text-gray-500">
            Designed with love by{" "}
            <span className="text-brand-blue font-medium">
              yantramayaa designs
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
