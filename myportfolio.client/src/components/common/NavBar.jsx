import { useState } from "react";
import { Menu, X } from "lucide-react"

const NavBar = () => {
    const [isOpen, SetIsOpen] = useState(false);

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Experience", href: "#experience" },
        { name: "Education", href: "#education" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav className="fixed top-0 w-full bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

                {/* Logo */}
                <a href="#" className="text-xl font-bold text-gray-800">
                Himanshu
                </a>

                {/* Desktop Links */}
                <ul className="hidden md:flex gap-8">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a href={link.href} className="text-gray-600 hover:text-blue-500 transition">
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={() => SetIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <ul className="md:hidden flex flex-col bg-white px-4 pb-4 gap-4 list-none">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a href={link.href} className="text-gray-600 hover:text-blue-500 transition">
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
};

export default NavBar;