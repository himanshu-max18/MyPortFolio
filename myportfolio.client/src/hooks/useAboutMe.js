import { useState, useEffect } from 'react';
import { getAboutMe } from '../api/aboutMeApi';

const useAboutMe = () => {
    const [aboutMe, setAboutMe] = useState(null); // null kyunki object hai array nahi
    const [loading, setLoading] = useState(true); // initially loading true hai kyunki data fetch karna hai
    const [error, setError] = useState(null); // initially error null hai kyunki abhi tak koi error nahi aaya

    useEffect(() => {
        const fetchAboutMe = async () => {
            try {
                const data = await getAboutMe();
                setAboutMe(data);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
        fetchAboutMe();
    }, []);

    return { aboutMe, loading, error };
};

export default useAboutMe;