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
        <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

                {/* Logo */}
                <a href="#" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                Himanshu Rawat
                </a>

                {/* Desktop Links */}
                <ul className="hidden md:flex gap-8">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a href={link.href} className="text-slate-400 hover:text-white transition">
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-slate-400" onClick={() => SetIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <ul className="md:hidden flex flex-col bg-slate-900 px-6 py-4 gap-6 list-none border-t border-slate-700/50">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a href={link.href} className="text-slate-400 hover:text-white transition">
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