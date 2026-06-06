import { motion } from "framer-motion";
import { ArrowDownRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import useAboutMe from "../../hooks/useAboutMe";
import Loader from "../common/Loader";

const focusItems = [
    "ASP.NET Core APIs",
    "Entity Framework + SQL",
    "Clean React interfaces",
    "Production deployment",
];

const HeroSection = () => {
    const { aboutMe, loading, error } = useAboutMe();

    if (loading) return <Loader />;

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-300">Error loading about me information.</p>
            </div>
        );
    }

    return (
        <section id="about" className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.16),transparent_34%),linear-gradient(180deg,#020617_0%,#0f172a_100%)] pt-28">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent"></div>

            <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-12 px-5 pb-16 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
                <div className="max-w-3xl">
                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-5 inline-flex rounded-full border border-blue-300/20 bg-blue-300/10 px-4 py-2 text-sm font-medium text-blue-100"
                    >
                        FullStack .NET Developer
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="max-w-4xl text-5xl font-semibold leading-[1.04] text-white sm:text-6xl lg:text-7xl"
                    >
                        Building dependable APIs and clean product experiences.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-6 text-lg leading-8 text-slate-300 sm:text-xl"
                    >
                        I'm <span className="font-semibold text-white">{aboutMe?.fullName}</span>, a FullStack backend-focused developer working with ASP.NET Core, PostgreSQL, SQL Server, and React to ship practical, maintainable web apps.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-blue-200/80"
                    >
                        Discipline from gym | Fuelled by food | Driven by code
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-9 flex flex-wrap gap-3"
                    >
                        <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-blue-950/30 transition hover:-translate-y-0.5 hover:bg-blue-50">
                            View case studies <ArrowDownRight size={17} />
                        </a>
                        <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-blue-300/50 hover:bg-blue-300/10">
                            Contact me <Mail size={17} />
                        </a>
                        {aboutMe?.gitHubUrl && (
                            <a href={aboutMe.gitHubUrl} target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-slate-200 transition hover:-translate-y-0.5 hover:border-white/30 hover:text-white" aria-label="GitHub profile">
                                <FaGithub size={18} />
                            </a>
                        )}
                        {aboutMe?.linkedInUrl && (
                            <a href={aboutMe.linkedInUrl} target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-slate-200 transition hover:-translate-y-0.5 hover:border-blue-300/50 hover:text-blue-100" aria-label="LinkedIn profile">
                                <FaLinkedin size={18} />
                            </a>
                        )}
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-blue-950/30 backdrop-blur"
                >
                    <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-6">
                        <div className="mb-8 flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm text-slate-400">Current focus</p>
                                <p className="mt-1 text-xl font-semibold text-white">Backend systems</p>
                            </div>
                            <span className="shrink-0 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-medium text-emerald-200">Open to roles</span>
                        </div>

                        <div className="space-y-4">
                            {focusItems.map((item) => (
                                <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                                    <span className="text-sm text-slate-200">{item}</span>
                                    <span className="h-2 w-2 rounded-full bg-blue-300"></span>
                                </div>
                            ))}
                        </div>

                        {aboutMe?.bio && (
                            <p className="mt-7 border-t border-white/10 pt-5 text-sm leading-7 text-slate-400">
                                {aboutMe.bio}
                            </p>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
