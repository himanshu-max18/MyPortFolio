import { BriefcaseBusiness } from "lucide-react";
import useExperience from "../../hooks/useExperience";
import FadeInSection from "../common/FadeInSection";
import Loader from "../common/Loader";

const formatYear = (date) => new Date(date).getFullYear();

const ExperienceSection = () => {
    const { experience, loading, error } = useExperience();

    if (loading) return <Loader compact />;
    if (error) return <p className="py-16 text-center text-red-300">Something went wrong while loading experience.</p>;

    return (
        <section id="experience" className="bg-slate-950 py-24">
            <div className="mx-auto max-w-5xl px-5 lg:px-8">
                <FadeInSection>
                    <div className="mb-12 text-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">Experience</p>
                        <h2 className="text-4xl font-semibold text-white sm:text-5xl">Professional journey</h2>
                    </div>
                </FadeInSection>

                <div className="relative grid gap-5">
                    {experience.map((exp, index) => (
                        <FadeInSection key={exp.id} delay={index * 0.05}>
                            <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition hover:border-blue-300/30 hover:bg-white/[0.055]">
                                <div className="flex flex-wrap items-start justify-between gap-5">
                                    <div className="flex gap-4">
                                        <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-300/10 text-blue-200">
                                            <BriefcaseBusiness size={22} />
                                        </span>
                                        <div>
                                            <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                                            <p className="mt-1 font-medium text-blue-200">{exp.company}</p>
                                        </div>
                                    </div>

                                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-slate-300">
                                        {formatYear(exp.startDate)} - {exp.isCurrent ? "Present" : formatYear(exp.endDate)}
                                    </span>
                                </div>

                                {exp.description && (
                                    <p className="mt-5 text-sm leading-7 text-slate-400">{exp.description}</p>
                                )}
                            </article>
                        </FadeInSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
