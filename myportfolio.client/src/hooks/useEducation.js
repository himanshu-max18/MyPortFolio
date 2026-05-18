import { useState, useEffect } from 'react';
import { getEducation } from '../api/educationApi';

const useEducation = () => {
    const [education, Seteducation] = useState([]); //array kyunki multiple education entries ho sakti hain
    const [loading, Setloading] = useState(true); // initially loading true hai kyunki data fetch karna hai
    const [error, SetError] = useState(null); // initially error null hai kyunki abhi tak koi error nahi aaya

    // useEffect to fetch education data on component mount
    useEffect(() => {
        // async function to fetch education data
        const fetchEducation = async () => {
            try {
                const data = await getEducation();
                Seteducation(data);
                Setloading(false);
            }
            catch (err) {
                SetError(err);
            }
            finally {
                Setloading(false);
            }
        };

        fetchEducation();
    }, []);

    return { education, loading, error }; // return education data, loading state and error state
};
export default useEducation;