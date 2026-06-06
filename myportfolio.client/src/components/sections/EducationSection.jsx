import { GraduationCap } from "lucide-react";
import useEducation from "../../hooks/useEducation";
import FadeInSection from "../common/FadeInSection";
import Loader from "../common/Loader";

const EducationSection = () => {
    const { education, loading, error } = useEducation();

    if (loading) return <Loader compact />;
    if (error) return <p className="py-16 text-center text-red-300">Something went wrong while loading education.</p>;

    return (
        <section id="education" className="bg-slate-950 py-24">
            <div className="mx-auto max-w-5xl px-5 lg:px-8">
                <FadeInSection>
                    <div className="mb-12 text-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">Education</p>
                        <h2 className="text-4xl font-semibold text-white sm:text-5xl">Academic background</h2>
                    </div>
                </FadeInSection>

                <div className="grid gap-5">
                    {education.map((edu, index) => (
                        <FadeInSection key={edu.id} delay={index * 0.05}>
                            <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition hover:border-blue-300/30 hover:bg-white/[0.055]">
                                <div className="flex flex-wrap items-start justify-between gap-5">
                                    <div className="flex gap-4">
                                        <span className="grid h-12 w-12 place-items-center rounded-xl bg-indigo-300/10 text-indigo-200">
                                            <GraduationCap size={23} />
                                        </span>
                                        <div>
                                            <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
                                            <p className="mt-1 font-medium text-blue-200">{edu.institution}</p>
                                            {edu.fieldOfStudy && <p className="mt-1 text-sm text-slate-400">{edu.fieldOfStudy}</p>}
                                        </div>
                                    </div>

                                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-slate-300">
                                        {edu.startYear} - {edu.endYear}
                                    </span>
                                </div>
                            </article>
                        </FadeInSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EducationSection;
