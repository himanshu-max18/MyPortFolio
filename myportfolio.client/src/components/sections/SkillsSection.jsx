import { useMemo } from "react";
import { Code2, Database, Server, Wrench } from "lucide-react";
import useSkills from "../../hooks/useSkills";
import FadeInSection from "../common/FadeInSection";
import Loader from "../common/Loader";

const categoryIcons = {
    Backend: Server,
    Database,
    Frontend: Code2,
    Tools: Wrench,
};

const getSkillsImages = (name) => {
    const images = {
        'React': '/reactjs-icon.svg',
        'HTML/CSS': '/html_css_icon.svg',
        'TailwindCSS': '/tailwindcss-icon.svg',
        'Bootstrap': '/getbootstrap-icon.svg',
        'JavaScript': '/javascript-icon.svg',
        'jQuery': 'jquery-icon.svg',
        'C#': '/CSharp.svg',
        'ASP.NET Core': '/1net-framework-96.svg',
        'SQL Server': '/sql-server.svg',
        'PostgreSQL': '/PostgresSQL.svg',
        'Git': '/Git.svg',
        'GitHub': '/github-logo-64.png',
        'Visual Studio': '/vs.svg',
        'Visual Studio Code': '/vscode.svg',
        'Postman': '/Postman.svg',
    };
    return images[name] || null;
};

const getSkillInitials = (name) => (
    name
        .replace(".", " ")
        .split(/\s|-/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase()
);

const SkillsSection = () => {
    const { skills, loading, error } = useSkills();

    const groupedSkills = useMemo(() => (
        skills.reduce((acc, skill) => {
            const category = skill.category || "Core";
            acc[category] = acc[category] || [];
            acc[category].push(skill);
            return acc;
        }, {})
    ), [skills]);

    if (loading) return <Loader compact />;

    if (error) {
        return (
            <div className="flex min-h-80 items-center justify-center">
                <p className="text-red-300">Something went wrong while loading skills.</p>
            </div>
        );
    }

    return (
        <section id="skills" className="bg-slate-950 py-24">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <FadeInSection>
                    <div className="mb-12 grid gap-6 lg:grid-cols-[0.75fr_1fr] lg:items-end">
                        <div>
                            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">Capabilities</p>
                            <h2 className="text-4xl font-semibold text-white sm:text-5xl">Backend-first skill set</h2>
                        </div>
                        <p className="text-lg leading-8 text-slate-400">
                            Focused on .NET APIs, relational databases, clean integrations, and UI implementation that supports the product rather than distracting from it.
                        </p>
                    </div>
                </FadeInSection>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {Object.entries(groupedSkills).map(([category, items], index) => {
                        const CategoryIcon = categoryIcons[category] || Server;

                        return (
                            <FadeInSection key={category} delay={index * 0.05}>
                                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-1 hover:border-blue-300/30 hover:bg-white/[0.055]">
                                    <div className="mb-5 flex items-center gap-3">
                                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-300/10 text-blue-200">
                                            <CategoryIcon size={20} />
                                        </span>
                                        <h3 className="text-lg font-semibold text-white">{category}</h3>
                                    </div>

                                    <ul className="grid gap-2">
                                        {items.map((skill) => {
                                            const name = skill.name.trim();

                                            return (
                                                <li key={skill.id} className="flex min-h-12 items-center gap-3 rounded-xl border border-white/10 bg-slate-950/45 px-3 py-2 text-slate-300 transition hover:border-white/20 hover:text-white">
                                                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-blue-300/15 bg-blue-300/10 text-xs font-bold text-blue-100">
                                                    {getSkillsImages(name) ? (
                                                        <img 
                                                            src={getSkillsImages(name)} 
                                                            alt={name}
                                                            className="w-7 h-7 object-contain"
                                                        />
                                                    ) : (
                                                        getSkillInitials(name)
                                                    )}
                                                </span>
                                                <span className="text-sm font-medium">{name}</span>
                                            </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </FadeInSection>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
