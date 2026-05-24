import useSkills from '../../hooks/useSkills';
import FadeInSection from '../common/FadeInSection';
import Loader from '../common/Loader';
import {
    ReactOriginal, Html5Original, Css3Original, CsharpOriginal,
    DotnetcoreOriginal, GitOriginal,
    GithubOriginal, VscodeOriginal, VisualstudioOriginal,
    BootstrapOriginal, TailwindcssOriginal, PostmanOriginal,
} from 'devicons-react';
import { DiMsqlServer } from 'react-icons/di';
import { JavascriptOriginal, JqueryOriginal, PostgresqlOriginal } from 'devicons-react';
import { SiDotnet } from 'react-icons/si';

const SkillsSection = () => {
    const { skills, loading, error } = useSkills();

    const skillIcons = {
        'React': <ReactOriginal size={24} />,
        'HTML/CSS': (<span className="flex gap-1">
            <Html5Original size={24} />
            <Css3Original size={24} />
        </span>),
        'TailwindCSS': <TailwindcssOriginal size={24} />,
        'Bootstrap': <BootstrapOriginal size={24} />,
        'C#': <CsharpOriginal size={24} />,
        'ASP.NET Core': <DotnetcoreOriginal size={24} className="bg-white rounded-full border-none" />,
        'PostgreSQL': <PostgresqlOriginal size={24} />,
        'SQL Server': <DiMsqlServer size={24} className="text-red-400" />,
        'SQL Server Management Studio': <DiMsqlServer size={24} className="text-red-300" />,
        'Git': <GitOriginal size={24} />,
        'GitHub': <GithubOriginal size={24} />,
        'Visual Studio': <VisualstudioOriginal size={24} />,
        'Visual Studio Code': <VscodeOriginal size={24} />,
        'Postman': <PostmanOriginal size={24} />,
        'Entity Framework Core': <SiDotnet size={24} className="text-violet-300" />,
        'LINQ': <SiDotnet size={24} className="text-purple-400" />,
        'ADO.NET': <SiDotnet size={24} className="text-indigo-400" />,
        'JavaScript': <JavascriptOriginal size={24} />,
        'jQuery': <JqueryOriginal size={24} />,
    };

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
        <section id="skills" className="py-20 bg-slate-900 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4">

                <div className="absolute top-10 right-10 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

                {/* Heading */}
                <FadeInSection>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-4">Skills</h2>
                        <p className="text-slate-400 font-bold text-1xl">Technologies I work with</p>
                    </div>
                </FadeInSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.entries(groupedSkills).map(([category, skills]) => (
                        <FadeInSection>
                            <div key={category} className="bg-slate-900 rounded-xl p-6 border border-slate-700/50">
                                <h3 className="text-lg font-semibold text-violet-400 mb-4">{category}</h3>
                                <ul className="flex flex-col gap-2">
                                    {skills.map((skill) => (
                                        <li key={skill.id} className="flex items-center gap-3 bg-slate-800 px-4 py-3 rounded-lg text-slate-300 hover:text-white transition">
                                            <span className="text-xl">
                                                {skillIcons[skill.name.trim()]}
                                            </span>
                                            <span className="text-sm">{skill.name.trim()}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeInSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;