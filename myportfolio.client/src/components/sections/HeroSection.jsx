import useAboutMe from "../../hooks/useAboutMe";
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
        <section id="about" className="min-h-screen flex items-center justify-center bg-gray-50 pt-16">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <p className="text-blue-500 font-medium mb-2 text-2xl">
                    Hi there! 👋
                </p>

                <h1 className="text-5xl font-bold text-gray-800 mb-4">
                    I'm {aboutMe?.fullName}
                </h1>

                <h2 className="text-2xl text-gray-500 font-medium mb-6">
                    {aboutMe?.tagline}
                </h2>

                <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                    {aboutMe?.bio}
                </p>

                {/* Buttons */}
                <div className="flex gap-4 justify-center flex-wrap">
                    <a href="#projects"
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition font-medium">
                        View Projects
                    </a>
                    <a href="#contact"
                        className="border border-blue-500 text-blue-500 px-6 py-3 rounded-lg hover:bg-blue-100 transition font-medium">
                        Contact Me
                    </a>
                    <a href={aboutMe?.gitHubUrl} target="_blank" rel="noreferrer"
                        className="flex items-center gap-2 border border-gray-300 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-200 transition">
                        <FaGithub /> GitHub
                    </a>
                    <a href={aboutMe?.linkedInUrl} target="_blank" rel="noreferrer"
                        className="flex items-center gap-2 border border-gray-300 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-200 transition">
                        <FaLinkedin /> LinkedIn
                    </a>
                </div>

            </div>
        </section>
    );

};

export default HeroSection;