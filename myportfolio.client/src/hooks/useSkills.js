import { useState, useEffect } from 'react';
import { getSkills } from '../api/skillsApi';

const useSkills = () => {
    const [skills, setSkills] = useState([]); // array kyunki multiple skills ho sakti hain
    const [loading, setLoading] = useState(true); // initially loading true hai kyunki data fetch karna hai
    const [error, setError] = useState(null); // initially error null hai kyunki abhi tak koi error nahi aaya

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const data = await getSkills();
                setSkills(data);
                setLoading(false);
            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    return { skills, loading, error }; // return skills data, loading state and error state
};

export default useSkills;