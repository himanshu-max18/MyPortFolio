import { useState, useEffect } from "react";
import { getProjects } from "../api/projectsApi";

const useProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;

        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                if (!ignore) {
                    setProjects(data);
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

        fetchProjects();

        return () => {
            ignore = true;
        };
    }, []);

    return { projects, loading, error };
};

export default useProjects;
