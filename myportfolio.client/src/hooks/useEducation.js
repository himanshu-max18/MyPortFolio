import { useState, useEffect } from 'react';
import { getEducation } from '../api/educationApi';

const useEducation = () => {
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;

        const fetchEducation = async () => {
            try {
                const data = await getEducation();
                if (!ignore) {
                    setEducation(data);
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

        fetchEducation();

        return () => {
            ignore = true;
        };
    }, []);

    return { education, loading, error };
};
export default useEducation;
