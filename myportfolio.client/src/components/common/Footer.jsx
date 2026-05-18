import useAboutMe from "../../hooks/useAboutMe";

const Footer = () => {
    const { aboutMe } = useAboutMe();

    return (
        <footer className="bg-gray-800 text-gray-400 py-6 text-center">
            <p>Designed & Built by <span className="text-white font-medium">{aboutMe?.fullName}</span></p>
            <p className="text-sm mt-1">© {new Date().getFullYear()} All Rights Reserved</p>
        </footer>
    );
};

export default Footer;