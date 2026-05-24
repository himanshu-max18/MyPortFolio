const Footer = () => {
    return (
        <footer className="bg-slate-900 border-t border-slate-700/50 py-8 relative overflow-hidden">

            {/* Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-20 bg-blue-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 text-center">
                <p className="text-slate-300">
                    Designed & Built by{' '}
                    <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent font-semibold">
                        Himanshu Rawat
                    </span>
                </p>
                <p className="text-slate-500 text-sm mt-2">
                    © {new Date().getFullYear()} All Rights Reserved
                </p>
            </div>

        </footer>
    );
};

export default Footer;