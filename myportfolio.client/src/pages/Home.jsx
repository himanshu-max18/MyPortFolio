import { lazy, Suspense } from "react";
import NavBar from "../components/common/NavBar";
import HeroSection from "../components/sections/HeroSection";
import Footer from "../components/common/Footer";
import Loader from "../components/common/Loader";
import { AboutMeProvider } from "../context/AboutMeContext";

const SkillsSection = lazy(() => import("../components/sections/SkillsSection"));
const ProjectsSection = lazy(() => import("../components/sections/ProjectsSection"));
const ExperienceSection = lazy(() => import("../components/sections/ExperienceSection"));
const EducationSection = lazy(() => import("../components/sections/EducationSection"));
const ContactSection = lazy(() => import("../components/sections/ContactSection"));

const Home = () => {
    return (
        <AboutMeProvider>
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <NavBar />
                <main>
                    <HeroSection />
                    <Suspense fallback={<Loader compact />}>
                        <SkillsSection />
                        <ProjectsSection />
                        <ExperienceSection />
                        <EducationSection />
                        <ContactSection />
                    </Suspense>
                </main>
                <Footer />
            </div>
        </AboutMeProvider>
    );
};

export default Home;
