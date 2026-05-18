import axiosInstance from "./axiosInstance";

const getProjects = async () => {
    const response = await axiosInstance.get('/project')
    return response.data;
};

const getProjectById = async (id) => {
    const response = await axiosInstance.get(`/project/${id}`);
    return response.data;
};

const getFeaturedProjects = async () => {
    const response = await axiosInstance.get('/project/featured');
    return response.data;
};

const createProject = async (projectData) => {
    const response = await axiosInstance.post('/project', projectData);
    return response.data;
};

const updateProject =  async (id, projectData) => {
    const response = await axiosInstance.put(`/project/${id}`, projectData);
    return response.data;
};

const deleteProject = async (id) => {
    const response = await axiosInstance.delete(`/project/${id}`);
    return response.data;
};

export { getProjects, getProjectById, getFeaturedProjects, createProject, updateProject, deleteProject };