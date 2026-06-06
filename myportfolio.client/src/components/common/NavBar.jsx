import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
];

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
                <a href="#about" className="group flex items-center gap-3" aria-label="Himanshu Rawat home">
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-blue-400/30 bg-blue-400/10 text-sm font-bold text-blue-200">
                        HR
                    </span>
                    <span>
                        <span className="block text-sm font-semibold leading-none text-white">Himanshu Rawat</span>
                        <span className="mt-1 block text-xs text-slate-400 transition group-hover:text-blue-200">.NET Backend Developer</span>
                    </span>
                </a>

                <ul className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 md:flex">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a href={link.href} className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>

                <a href="#contact" className="hidden rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400 lg:inline-flex">
                    Hire me
                </a>

                <button
                    className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-slate-200 md:hidden"
                    onClick={() => setIsOpen((value) => !value)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {isOpen && (
                <ul className="mx-4 mb-4 flex list-none flex-col gap-1 rounded-2xl border border-white/10 bg-slate-950/95 p-2 shadow-2xl md:hidden">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                            >
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
