import axiosInstance from "./axiosInstance";

const getEducation = async () => {
    const response = await axiosInstance.get("/education");
    return response.data;
};

const getEducationById = async (id) => {
    const response = await axiosInstance.get(`/education/${id}`);
    return response.data;
};

const createEducation = async (educationData) => {
    const response = await axiosInstance.post("/education", educationData);
    return response.data;
};

const updateEducation = async (id, educationData) => {
    const response = await axiosInstance.put(`/education/${id}`, educationData);
    return response.data;
};

const deleteEducation = async (id) => {
    const response = await axiosInstance.delete(`/education/${id}`);
    return response.data;
};

export { getEducation, getEducationById, createEducation, updateEducation, deleteEducation };
