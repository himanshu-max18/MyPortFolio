import { useState, useEffect } from 'react';
import { getSkills } from '../api/skillsApi';

const useSkills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;

        const fetchSkills = async () => {
            try {
                const data = await getSkills();
                if (!ignore) {
                    setSkills(data);
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

        fetchSkills();

        return () => {
            ignore = true;
        };
    }, []);

    return { skills, loading, error };
};

export default useSkills;
