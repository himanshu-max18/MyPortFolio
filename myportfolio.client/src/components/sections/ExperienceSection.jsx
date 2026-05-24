import useExperience from '../../hooks/useExperience';
import Loader from '../common/Loader';
import FadeInSection from '../common/FadeInSection';

const ExperienceSection = () => {
    const { experience, loading, error } = useExperience();

    if (loading) return <Loader />;
    if (error) return <p className="text-red-500 text-center">Something went wrong!</p>;

    return (
        <section id="experience" className="py-20 bg-slate-900 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4">

                <div className="absolute top-10 left-20 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

                {/* Heading */}
                <FadeInSection>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-4">Experience</h2>
                        <p className="text-slate-400">My professional journey</p>
                    </div>
                </FadeInSection>

                {/* Timeline */}
                <div className="flex flex-col gap-8">
                    {experience.map((exp) => (
                        <FadeInSection>
                            <div key={exp.id} className="bg-slate-900 rounded-xl p-6 border-l-4 border-blue-500">

                                {/* Role & Company */}
                                <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">
                                            {exp.role}
                                        </h3>
                                        <p className="text-blue-500 font-medium">
                                            {exp.company}
                                        </p>
                                    </div>

                                    {/* Date */}
                                    <span className="text-sm text-slate-400">
                                        {new Date(exp.startDate).getFullYear()} —{' '}
                                        {exp.isCurrent ? 'Present' : new Date(exp.endDate).getFullYear()}
                                    </span>
                                </div>

                                {/* Description */}
                                {exp.description && (
                                    <p className="text-slate-400 text-sm leading-relaxed mt-2">
                                        {exp.description}
                                    </p>
                                )}

                            </div>
                        </FadeInSection>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ExperienceSection;