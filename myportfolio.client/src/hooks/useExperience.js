import { useState, useEffect } from 'react';
import { getExperience } from '../api/experienceApi';

const useExperience = () => {
    const [experience, Setexperience] = useState([]); // array kyunki multiple experience entries ho sakti hain
    const [loading, Setloading] = useState(true); // initially loading true hai kyunki data fetch karna hai
    const [error, SetError] = useState(null); // initially error null hai kyunki abhi tak koi error nahi aaya

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const datq = await getExperience();
                Setexperience(datq);
                Setloading(false);
            }
            catch (err) {
                SetError(err);
            }
            finally {
                Setloading(false);
            }
        };

        fetchExperience();
    }, []);

    return { experience, loading, error }; // return experience data, loading state and error state
};
export default useExperience;