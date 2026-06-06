import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { Mail, Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { createContact } from "../../api/contactApi";
import useAboutMe from "../../hooks/useAboutMe";

const ContactSection = () => {
    const { aboutMe } = useAboutMe();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((current) => ({ ...current, [name]: value }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await createContact(formData);
            toast.success("Message sent successfully");
            setFormData({ name: "", email: "", message: "" });
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="bg-slate-950 py-24">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                    <div className="rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(59,130,246,0.18),rgba(15,23,42,0.65))] p-7 sm:p-8">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">Contact</p>
                        <h2 className="text-4xl font-semibold text-white sm:text-5xl">Let's build something useful.</h2>
                        <p className="mt-5 text-base leading-8 text-slate-300">
                            Open to backend developer roles, internships, freelance work, and product teams that care about clean APIs and reliable delivery.
                        </p>

                        <div className="mt-8 grid gap-3">
                            {aboutMe?.email && (
                                <a href={`mailto:${aboutMe.email}`} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition hover:border-blue-300/40 hover:bg-white/[0.08]">
                                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-300/10 text-blue-100">
                                        <Mail size={20} />
                                    </span>
                                    <span>
                                        <span className="block text-xs uppercase tracking-[0.14em] text-slate-400">Email</span>
                                        <span className="mt-1 block text-sm font-medium text-white">{aboutMe.email}</span>
                                    </span>
                                </a>
                            )}
                            {aboutMe?.gitHubUrl && (
                                <a href={aboutMe.gitHubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition hover:border-white/30 hover:bg-white/[0.08]">
                                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-white">
                                        <FaGithub size={20} />
                                    </span>
                                    <span>
                                        <span className="block text-xs uppercase tracking-[0.14em] text-slate-400">GitHub</span>
                                        <span className="mt-1 block text-sm font-medium text-white">Review my code</span>
                                    </span>
                                </a>
                            )}
                            {aboutMe?.linkedInUrl && (
                                <a href={aboutMe.linkedInUrl} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition hover:border-blue-300/40 hover:bg-white/[0.08]">
                                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-300/10 text-blue-100">
                                        <FaLinkedin size={20} />
                                    </span>
                                    <span>
                                        <span className="block text-xs uppercase tracking-[0.14em] text-slate-400">LinkedIn</span>
                                        <span className="mt-1 block text-sm font-medium text-white">Connect professionally</span>
                                    </span>
                                </a>
                            )}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-blue-950/20 backdrop-blur sm:p-8">
                        <div className="grid gap-5">
                            <label className="grid gap-2">
                                <span className="text-sm font-medium text-slate-200">Name</span>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-blue-300/60"
                                />
                            </label>

                            <label className="grid gap-2">
                                <span className="text-sm font-medium text-slate-200">Email</span>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-blue-300/60"
                                />
                            </label>

                            <label className="grid gap-2">
                                <span className="text-sm font-medium text-slate-200">Message</span>
                                <textarea
                                    name="message"
                                    placeholder="Tell me about the role, project, or opportunity..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={6}
                                    required
                                    className="resize-none rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-blue-300/60"
                                />
                            </label>

                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Sending..." : "Send message"} <Send size={17} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
