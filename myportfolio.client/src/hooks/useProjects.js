import { useState, useEffect } from "react"   
import { getProjects } from "../api/projectsApi";

const useProjects = () => {
    const [projects, SetProjects] = useState([]);
    const [loading, Setloading] = useState(true);
    const [error, SetError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                SetProjects(data);
                Setloading(false);
            }
            catch (err) {
                SetError(err.message);
            }
            finally {
                Setloading(false);
            }
        };
        fetchProjects();

    }, []);

    return { projects, loading, error };
};

export default useProjects;