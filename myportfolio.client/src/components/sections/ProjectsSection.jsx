import useProjects from '../../hooks/useProjects';
import Loader from '../common/Loader';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectsSection = () => {
    const { projects, loading, error } = useProjects();

    if (loading) return <Loader />;
    if (error) return <p className="text-red-500 text-center">Something went wrong!</p>;

    return (
        <section id="projects" className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">

                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Projects</h2>
                    <p className="text-gray-500 text-1xl">Things I have built</p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div key={project.id}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col gap-4">

                            {/* Title */}
                            <h3 className="text-xl font-semibold text-gray-800">
                                {project.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-500 text-sm leading-relaxed flex-1">
                                {project.description}
                            </p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.split(',').map((tech, index) => (
                                    <span key={index}
                                        className="bg-blue-50 text-blue-500 text-xs px-3 py-1 rounded-full">
                                        {tech.trim()}
                                    </span>
                                ))}
                            </div>

                            {/* Links */}
                            <div className="flex gap-4">
                                {project.gitHubUrl && (
                                    <a href={project.gitHubUrl} target="_blank" rel="noreferrer"
                                        className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition text-sm">
                                        <FaGithub /> GitHub
                                    </a>
                                )}
                                {project.liveUrl && (
                                    <a href={project.liveUrl} target="_blank" rel="noreferrer"
                                        className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition text-sm">
                                        <FaExternalLinkAlt /> Live Demo
                                    </a>
                                )}
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ProjectsSection;