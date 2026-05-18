import axiosInstance from "./axiosInstance";

const getExperience = async () => {
    const response = await axiosInstance.get("/experience");
    return response.data;
};

const getExperienceById = async (id) => {
    const response = await axiosInstance.get(`/experience/${id}`);
    return response.data;
};

const createExperience = async (experienceData) => {
    const response = await axiosInstance.post("/experience", experienceData);
    return response.data;  
};

const updateExperience = async (id, experienceData) => {
    const response = await axiosInstance.put(`/experience/${id}`, experienceData);
    return response.data;
};

const deleteExperience = async (id) => {
    const response = await axiosInstance.delete(`/experience/${id}`);
    return response.data;
};

export { getExperience, getExperienceById, createExperience, updateExperience, deleteExperience };
