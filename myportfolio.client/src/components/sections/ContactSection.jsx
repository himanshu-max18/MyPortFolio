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
        <section id="contact" className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4">

                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Contact</h2>
                    <p className="text-gray-500">Get in touch with me</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    <div className="flex flex-col gap-6">
                        <p className="text-gray-600 leading-relaxed">
                            Feel free to reach out for collaborations, opportunities, or just a friendly chat!
                        </p>

                        <div className="flex flex-col gap-4">
                            <a href={`mailto:${aboutMe?.email}`} className="flex items-center gap-3 text-gray-600 hover:text-blue-500 transition">
                                <FaEnvelope className="text-red-400 text-xl" />
                                {aboutMe?.email}
                            </a>
                            <a href={aboutMe?.gitHubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-black-600 transition">
                                <FaGithub className="text-black-500 text-xl" />
                                GitHub
                            </a>
                            <a href={aboutMe?.linkedInUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-blue-500 transition">
                                <FaLinkedin className="text-blue-500 text-xl" />
                                LinkedIn
                            </a>
                        </div>

                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Name */}
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="border border-gray-200 rounded-lg px-4 py-3 text-gray-600 outline-none focus:border-blue-500 transition"
                        />

                        {/* Email */}
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="border border-gray-200 rounded-lg px-4 py-3 text-gray-600 outline-none focus:border-blue-500 transition"
                        />

                        {/* Message */}
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            required
                            className="border border-gray-200 rounded-lg px-4 py-3 text-gray-600 outline-none focus:border-blue-500 transition resize-none"
                        />

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition font-medium disabled:opacity-50">
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>

                    </form>
                </div>

            </div>
        </section>
    );
}; 

export default ContactSection;