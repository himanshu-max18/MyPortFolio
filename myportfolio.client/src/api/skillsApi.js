import axiosInstance from "./axiosInstance";

const getSkills = async () => {
    const response = await axiosInstance.get('/skill');
    return response.data;
};

const getSkillById = async (id) => {
    const response = await axiosInstance.get(`/skill/${id}`);
    return response.data;
};

const getSkillsByCategory = async (category) => {
    const response = await axiosInstance.get(`/skill/category/${category}`);
    return response.data;
};

const createSkill = async (skillData) => {
    const response = await axiosInstance.post('/skill', skillData);
    return response.data;
};

const updateSkill = async (id, skillData) => {
    const response = await axiosInstance.put(`/skill/${id}`, skillData);
    return response.data;
};

const deleteSkill = async (id) => {
    const response = await axiosInstance.delete(`/skill/${id}`);
    return response.data;
};

export { getSkills, getSkillById, getSkillsByCategory, createSkill, updateSkill, deleteSkill };