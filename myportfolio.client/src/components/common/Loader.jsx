const Loader = ({ compact = false }) => {
    return (
        <div className={`${compact ? "min-h-48" : "min-h-screen"} flex items-center justify-center`}>
            <div className="h-10 w-10 rounded-full border-2 border-blue-400/30 border-t-blue-400 animate-spin">
            </div>
        </div>
    );
};

export default Loader;
