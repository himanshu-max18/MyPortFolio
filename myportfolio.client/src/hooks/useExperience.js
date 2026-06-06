import { useState, useEffect } from 'react';
import { getExperience } from '../api/experienceApi';

const useExperience = () => {
    const [experience, setExperience] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;

        const fetchExperience = async () => {
            try {
                const data = await getExperience();
                if (!ignore) {
                    setExperience(data);
                }
            }
            catch (err) {
                if (!ignore) {
                    setError(err.message);
                }
            }
            finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        fetchExperience();

        return () => {
            ignore = true;
        };
    }, []);

    return { experience, loading, error };
};
export default useExperience;
