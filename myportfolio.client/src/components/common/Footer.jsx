const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-slate-950 py-8">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 text-center sm:flex-row sm:text-left lg:px-8">
                <p className="text-sm text-slate-300">
                    Designed and built by <span className="font-semibold text-white">Himanshu Rawat</span>
                </p>
                <p className="text-sm text-slate-500">
                    Copyright {new Date().getFullYear()}. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
