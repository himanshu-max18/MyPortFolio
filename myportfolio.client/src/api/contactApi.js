import axiosInstance from "./axiosInstance";        

const getContact = async () => {
    const response = await axiosInstance.get("/contact");   
    return response.data;
};

const getContactById = async (id) => {
    const response = await axiosInstance.get(`/contact/${id}`);
    return response.data;
};

const createContact = async (contactData) => {
    const response = await axiosInstance.post("/contact", contactData);
    return response.data;
};

const MarkasRead = async (id) => {
    const response = await axiosInstance.patch(`/contact/${id}/read`);
    return response.data;
};

const deleteContact = async (id) => {
    const response = await axiosInstance.delete(`/contact/${id}`);
    return response.data;
};

export { getContact, getContactById, createContact, MarkasRead, deleteContact };