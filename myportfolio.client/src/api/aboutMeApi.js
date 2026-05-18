import axiosInstance from "./axiosInstance";

const getAboutMe = async () => {
    const response = await axiosInstance.get("/aboutme");
    return response.data[0];
};

const getAboutMeById = async (id) => {
    const response = await axiosInstance.get(`/aboutme/${id}`);
    return response.data;
};

const createAboutMe = async (aboutMeData) => {
    const response = await axiosInstance.post("/aboutme", aboutMeData);
    return response.data;
};

const updateAboutMe = async (id, aboutMeData) => {
    const response = await axiosInstance.put(`/aboutme/${id}`, aboutMeData);
    return response.data;
};

const deleteAboutMe = async (id) => {
    const response = await axiosInstance.delete(`/aboutme/${id}`);
    return response.data;
};

export { getAboutMe, getAboutMeById, createAboutMe, updateAboutMe, deleteAboutMe };
