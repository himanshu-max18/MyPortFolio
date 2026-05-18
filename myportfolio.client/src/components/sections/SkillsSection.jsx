import useSkills from '../../hooks/useSkills';
import Loader from '../common/Loader';

const SkillsSection = () => {
    const { skills, loading, error } = useSkills();

    if (loading) return <Loader />

    if (error) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-red-500">
                Something went wrong!
            </p>
        </div>
    );

    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {})

    return (
        <section id="skills" className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">

                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Skills</h2>
                    <p className="text-gray-500 text-1xl">Technologies I work with</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.entries(groupedSkills).map(([category, skills]) => (
                        <div key={category} className="bg-gray-50 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-blue-500 mb-4">{category}</h3>
                            <ul className="flex flex-col gap-2">
                                {skills.map((skill) => (
                                    <li key={skill.id} className="bg-white px-4 py-2 rounded-lg text-gray-600 shadow-sm"> 
                                        {skill.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;