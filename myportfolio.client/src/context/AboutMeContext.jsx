import { useEffect, useMemo, useState } from "react";
import { getAboutMe } from "../api/aboutMeApi";
import { AboutMeContext } from "./AboutMeContextValue";

export const AboutMeProvider = ({ children }) => {
    const [aboutMe, setAboutMe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;

        const fetchAboutMe = async () => {
            try {
                const data = await getAboutMe();
                if (!ignore) {
                    setAboutMe(data);
                }
            } catch (err) {
                if (!ignore) {
                    setError(err.message);
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        fetchAboutMe();

        return () => {
            ignore = true;
        };
    }, []);

    const value = useMemo(() => ({ aboutMe, loading, error }), [aboutMe, loading, error]);

    return (
        <AboutMeContext.Provider value={value}>
            {children}
        </AboutMeContext.Provider>
    );
};
