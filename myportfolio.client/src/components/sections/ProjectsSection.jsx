import { ExternalLink, Layers, Sparkles, Target } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import useProjects from "../../hooks/useProjects";
import FadeInSection from "../common/FadeInSection";
import Loader from "../common/Loader";

const splitTechStack = (techStack = "") => (
    techStack
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean)
);

const createCaseStudy = (project) => {
    const description = project.description?.trim() || "A production-focused web project built with practical engineering decisions.";
    const sentences = description.split(/(?<=[.!?])\s+/).filter(Boolean);

    return {
        problem: sentences[0] || description,
        solution: sentences.slice(1, 3).join(" ") || "Designed and implemented a maintainable solution with clean UI, API integration, and reliable data flow.",
        impact: project.isFeatured
            ? "Featured project that demonstrates end-to-end ownership and interview-ready engineering depth."
            : "Shows practical delivery, clean implementation, and comfort working across frontend and backend concerns.",
    };
};

const ProjectsSection = () => {
    const { projects, loading, error } = useProjects();

    if (loading) return <Loader compact />;
    if (error) return <p className="py-16 text-center text-red-300">Something went wrong while loading projects.</p>;

    return (
        <section id="projects" className="bg-slate-950 py-24">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <FadeInSection>
                    <div className="mb-12 max-w-2xl">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">Selected work</p>
                        <h2 className="text-4xl font-semibold text-white sm:text-5xl">Project case studies</h2>
                        <p className="mt-4 text-lg leading-8 text-slate-400">
                            A closer look at how I think through problem, implementation, stack, and user impact.
                        </p>
                    </div>
                </FadeInSection>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {projects.map((project, index) => {
                        const techStack = splitTechStack(project.techStack);
                        const caseStudy = createCaseStudy(project);

                        return (
                            <FadeInSection key={project.id} delay={index * 0.05}>
                                <article className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] transition duration-300 hover:-translate-y-1 hover:border-blue-300/30 hover:bg-white/[0.055] hover:shadow-2xl hover:shadow-blue-950/30">
                                    {project.imageUrl && (
                                        <div className="aspect-[16/9] overflow-hidden bg-slate-900">
                                            <img
                                                src={project.imageUrl}
                                                alt={`${project.title} preview`}
                                                loading={index < 2 ? "eager" : "lazy"}
                                                decoding="async"
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                                            />
                                        </div>
                                    )}

                                    <div className="flex h-full flex-col p-6 sm:p-7">
                                        <div className="mb-6 flex items-start justify-between gap-4">
                                            <div>
                                                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">Case study</p>
                                                <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                                            </div>
                                            {project.isFeatured && (
                                                <span className="rounded-full border border-blue-300/20 bg-blue-300/10 px-3 py-1 text-xs font-medium text-blue-100">
                                                    Featured
                                                </span>
                                            )}
                                        </div>

                                        <div className="grid gap-4">
                                            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                                                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                                                    <Target size={16} className="text-blue-300" /> Problem
                                                </div>
                                                <p className="text-sm leading-6 text-slate-400">{caseStudy.problem}</p>
                                            </div>

                                            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                                                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                                                    <Sparkles size={16} className="text-indigo-300" /> Solution
                                                </div>
                                                <p className="text-sm leading-6 text-slate-400">{caseStudy.solution}</p>
                                            </div>

                                            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                                                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                                                    <Layers size={16} className="text-cyan-300" /> Tech stack
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {techStack.map((tech) => (
                                                        <span key={tech} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-medium text-slate-200">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <p className="text-sm leading-6 text-slate-400">
                                                <span className="font-semibold text-slate-200">Impact:</span> {caseStudy.impact}
                                            </p>
                                        </div>

                                        <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-5">
                                            {project.gitHubUrl && (
                                                <a href={project.gitHubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-white/30 hover:text-white">
                                                    <FaGithub size={16} /> Code
                                                </a>
                                            )}
                                            {project.liveUrl && (
                                                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-400">
                                                    <ExternalLink size={16} /> Live demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            </FadeInSection>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
