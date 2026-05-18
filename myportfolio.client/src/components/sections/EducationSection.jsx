import useEducation from '../../hooks/useEducation';
import Loader from '../common/Loader';
import { FaGraduationCap } from 'react-icons/fa';

const EducationSection = () => {
    const { education, loading, error } = useEducation();

    if (loading) return <Loader />;
    if (error) return <p className="text-red-500 text-center">Something went wrong!</p>;

    return (
        <section id="education" className="py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4">

                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Education</h2>
                    <p className="text-gray-500">My academic background</p>
                </div>

                {/* Education List */}
                <div className="flex flex-col gap-6">
                    {education.map((edu) => (
                        <div key={edu.id}
                            className="bg-white rounded-xl p-6 border-l-4 border-blue-500 shadow-sm">

                            <div className="flex justify-between items-start flex-wrap gap-2">
                                <div className="flex gap-4 items-start">

                                    {/* Icon */}
                                    <div className="bg-blue-50 p-3 rounded-lg">
                                        <FaGraduationCap className="text-blue-500 text-xl" />
                                    </div>

                                    {/* Info */}
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {edu.degree}
                                        </h3>
                                        <p className="text-blue-500 font-medium">
                                            {edu.institution}
                                        </p>
                                        <p className="text-gray-400 text-sm">
                                            {edu.fieldOfStudy}
                                        </p>
                                    </div>

                                </div>

                                {/* Years */}
                                <span className="text-sm text-gray-400">
                                    {edu.startYear} — {edu.endYear}
                                </span>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default EducationSection;