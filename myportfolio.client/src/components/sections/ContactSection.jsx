import { useState } from 'react';
import { createContact } from '../../api/contactApi';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import useAboutMe from '../../hooks/useAboutMe';
import toast from "react-hot-toast";

const ContactSection = () => {
    const { aboutMe } = useAboutMe();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createContact(formData);
            toast.success('Message Sent Successfully')
            setFormData({ name: '', email: '', message: '' })
        }
        catch {
            toast.error('Something went wrong Please try Again')
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-20 bg-slate-900 relative overflow-hidden">

            {/* Background glow effects */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl"></div>

            <div className="max-w-4xl mx-auto px-4 relative z-10">

                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">Let's Connect</h2>
                    <p className="text-slate-400">Have a project in mind? Let's work together!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Left - Info Cards */}
                    <div className="flex flex-col gap-4">

                        <p className="text-slate-400 leading-relaxed mb-2">
                            Feel free to reach out for collaborations, opportunities, or just a friendly chat!
                        </p>

                        {/* Email Card */}
                        <a href={`mailto:${aboutMe?.email}`}
                            className="flex items-center gap-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-blue-500/50 transition group">
                            <div className="bg-blue-500/10 p-3 rounded-lg">
                                <FaEnvelope className="text-blue-400 text-xl" />
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs mb-1">Email</p>
                                <p className="text-white text-sm group-hover:text-blue-400 transition">{aboutMe?.email}</p>
                            </div>
                        </a>

                        {/* GitHub Card */}
                        <a href={aboutMe?.gitHubUrl} target="_blank" rel="noreferrer"
                            className="flex items-center gap-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-slate-400/50 transition group">
                            <div className="bg-slate-500/10 p-3 rounded-lg">
                                <FaGithub className="text-slate-300 text-xl" />
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs mb-1">GitHub</p>
                                <p className="text-white text-sm group-hover:text-slate-300 transition">View my work</p>
                            </div>
                        </a>

                        {/* LinkedIn Card */}
                        <a href={aboutMe?.linkedInUrl} target="_blank" rel="noreferrer"
                            className="flex items-center gap-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-blue-400/50 transition group">
                            <div className="bg-blue-400/10 p-3 rounded-lg">
                                <FaLinkedin className="text-blue-400 text-xl" />
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs mb-1">LinkedIn</p>
                                <p className="text-white text-sm group-hover:text-blue-400 transition">Connect with me</p>
                            </div>
                        </a>

                    </div>

                    {/* Right - Form */}
                    <form onSubmit={handleSubmit}
                        className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 flex flex-col gap-4">

                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-slate-300 outline-none focus:border-blue-500 transition placeholder:text-slate-500"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-slate-300 outline-none focus:border-blue-500 transition placeholder:text-slate-500"
                        />

                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            required
                            className="bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-slate-300 outline-none focus:border-blue-500 transition placeholder:text-slate-500 resize-none"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition font-medium disabled:opacity-50">
                            {loading ? 'Sending...' : 'Send Message →'}
                        </button>

                    </form>
                </div>
            </div>
        </section>
    );
}; 

export default ContactSection;