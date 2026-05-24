import useEducation from '../../hooks/useEducation';
import Loader from '../common/Loader';
import { FaGraduationCap } from 'react-icons/fa';
import FadeInSection from '../common/FadeInSection';

const EducationSection = () => {
    const { education, loading, error } = useEducation();

    if (loading) return <Loader />;
    if (error) return <p className="text-red-500 text-center">Something went wrong!</p>;

    return (
        <section id="education" className="py-20 bg-slate-900 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4">

                <div className="absolute top-10 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-20 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl"></div>

                {/* Heading */}
                <FadeInSection>

                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-4">Education</h2>
                        <p className="ext-slate-400">My academic background</p>
                    </div>
                </FadeInSection>
                {/* Education List */}
                <div className="flex flex-col gap-6">
                    {education.map((edu) => (
                        <FadeInSection>

                            <div key={edu.id}
                                className="bg-slate-800 rounded-xl p-6 border-l-4 border-violet-500 shadow-sm">

                                <div className="flex justify-between items-start flex-wrap gap-2">
                                    <div className="flex gap-4 items-start">

                                        {/* Icon */}
                                        <div className="bg-violet-500/10 p-3 rounded-lg">
                                            <FaGraduationCap className="text-violet-400 text-xl" />
                                        </div>

                                        {/* Info */}
                                        <div>
                                            <h3 className="text-xl font-semibold text-white">
                                                {edu.degree}
                                            </h3>
                                            <p className="text-blue-400 font-medium">
                                                {edu.institution}
                                            </p>
                                            <p className="text-slate-400 text-sm">
                                                {edu.fieldOfStudy}
                                            </p>
                                        </div>

                                    </div>

                                    {/* Years */}
                                    <span className="text-sm text-slate-400">
                                        {edu.startYear} — {edu.endYear}
                                    </span>

                                </div>
                            </div>
                        </FadeInSection>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default EducationSection;