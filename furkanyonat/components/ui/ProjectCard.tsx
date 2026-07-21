import React from 'react';

interface ProjectCardProps {
    project: {
        name: string;
        description: string;
        link: string;
        tags: string[];
    };
    visitProjectText: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, visitProjectText }) => {
    return (
        <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label={`${project.name}: ${visitProjectText}`}
            className="group block glass-card p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/25 focus:outline-none focus:ring-2 focus:ring-blue-400/70"
        >
            <div className="relative z-10 flex h-full flex-col gap-5">
                <div>
                    <h3 className="text-lg font-bold text-primary-text font-display leading-snug">{project.name}</h3>
                    <p className="text-secondary-text text-sm mt-2 leading-relaxed">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                        <span key={tag} className="project-tag text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary-text">
                    {visitProjectText}
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
                </span>
            </div>
        </a>
    );
};

export default ProjectCard;