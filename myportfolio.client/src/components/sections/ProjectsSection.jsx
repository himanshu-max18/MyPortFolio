import useProjects from '../../hooks/useProjects';
import Loader from '../common/Loader';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import FadeInSection from '../common/FadeInSection';

const ProjectsSection = () => {
    const { projects, loading, error } = useProjects();

    if (loading) return <Loader />;
    if (error) return <p className="text-red-500 text-center">Something went wrong!</p>;

    return (
        <section id="projects" className="py-20 bg-slate-900 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4">

                <div className="absolute top-20 left-40 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-40 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl"></div>

                {/* Heading */}
                <FadeInSection>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-4">Projects</h2>
                        <p className="text-slate-400 text-1xl">Things I have built</p>
                    </div>
                </FadeInSection>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <FadeInSection>
                            <div key={project.id}
                                className="bg-slate-800 rounded-xl border border-slate-700/50 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10 transition p-6 flex flex-col gap-4">

                                {/* Title */}
                                <h3 className="text-xl font-semibold text-white">
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p className="text-slate-400 text-sm leading-relaxed flex-1">
                                    {project.description}
                                </p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.split(',').map((tech, index) => (
                                        <span key={index}
                                            className="bg-violet-500/10 text-violet-300 text-xs px-3 py-1 rounded-full border border-violet-500/20">
                                            {tech.trim()}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex gap-4">
                                    {project.gitHubUrl && (
                                        <a href={project.gitHubUrl} target="_blank" rel="noreferrer"
                                            className="flex items-center gap-2 text-slate-400 hover:text-white transition text-sm">
                                            <FaGithub /> GitHub
                                        </a>
                                    )}
                                    {project.liveUrl && (
                                        <a href={project.liveUrl} target="_blank" rel="noreferrer"
                                            className="flex items-center gap-2 text-slate-400 hover:text-violet-400 transition text-sm">
                                            <FaExternalLinkAlt /> Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </FadeInSection>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ProjectsSection;