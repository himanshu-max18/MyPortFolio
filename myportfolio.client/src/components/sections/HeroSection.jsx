import useAboutMe from "../../hooks/useAboutMe";
import { motion } from 'framer-motion';
import Loader from "../common/Loader";
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const HeroSection = () => {
    const { aboutMe, loading, error } = useAboutMe();

    if (loading) return <Loader />;

    if (error) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-red-500">
                Error loading about me information.
            </p>
        </div>
    );

    return (
        <section id="about" className="min-h-screen flex items-center justify-center bg-slate-900 pt-16 relative overflow-hidden">

            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl"></div>

            <div className="max-w-4xl mx-auto px-4 text-center">
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-blue-400 font-medium mb-2 text-2xl">
                    Hi there! 👋
                </motion.p>

                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-5xl font-bold text-white mb-4">
                    I'm {aboutMe?.fullName}
                </motion.h1>

                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="text-2xl text-violet-500 font-medium mb-6">
                    {aboutMe?.tagline}
                </motion.h2>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="text-slate-400 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                    {aboutMe?.bio}
                </motion.p>

                {/* Buttons */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }} className="flex gap-4 justify-center flex-wrap">
                    <a href="#projects"
                        className="bg-gradient-to-r from-blue-500 to-violet-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-medium">
                        View Projects
                    </a>
                    <a href="#contact"
                        className="border border-slate-600 text-slate-300 px-6 py-3 rounded-lg hover:border-violet-400 hover:text-violet-400 transition font-medium">
                        Contact Me
                    </a>
                    <a href={aboutMe?.gitHubUrl} target="_blank" rel="noreferrer"
                        className="flex items-center gap-2 border border-slate-600 text-slate-300 px-6 py-3 rounded-lg hover:border-blue-400 hover:text-blue-400 transition">
                        <FaGithub /> GitHub
                    </a>
                    <a href={aboutMe?.linkedInUrl} target="_blank" rel="noreferrer"
                        className="flex items-center gap-2 border border-slate-600 text-slate-300 px-6 py-3 rounded-lg hover:border-violet-400 hover:text-violet-400 transition">
                        <FaLinkedin /> LinkedIn
                    </a>
                </motion.div>

            </div>
        </section>
    );

};

export default HeroSection;