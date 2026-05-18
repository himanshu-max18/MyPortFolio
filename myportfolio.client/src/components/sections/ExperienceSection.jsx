import useExperience from '../../hooks/useExperience';
import Loader from '../common/Loader';

const ExperienceSection = () => {
    const { experience, loading, error } = useExperience();

    if (loading) return <Loader />;
    if (error) return <p className="text-red-500 text-center">Something went wrong!</p>;

    return (
        <section id="experience" className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4">

                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Experience</h2>
                    <p className="text-gray-500">My professional journey</p>
                </div>

                {/* Timeline */}
                <div className="flex flex-col gap-8">
                    {experience.map((exp) => (
                        <div key={exp.id} className="bg-gray-50 rounded-xl p-6 border-l-4 border-blue-500">

                            {/* Role & Company */}
                            <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {exp.role}
                                    </h3>
                                    <p className="text-blue-500 font-medium">
                                        {exp.company}
                                    </p>
                                </div>

                                {/* Date */}
                                <span className="text-sm text-gray-400">
                                    {new Date(exp.startDate).getFullYear()} —{' '}
                                    {exp.isCurrent ? 'Present' : new Date(exp.endDate).getFullYear()}
                                </span>
                            </div>

                            {/* Description */}
                            {exp.description && (
                                <p className="text-gray-500 text-sm leading-relaxed mt-2">
                                    {exp.description}
                                </p>
                            )}

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ExperienceSection;