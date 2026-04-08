import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createNew = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const createNewComment = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(`${baseUrl}/${id}`, newObject, config);
  return request.then((response) => response.data);
};

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);

  return request.then((response) => response.data);
};

const addNewLike = async (id, updatedBlog) => {
  const currentLike = updatedBlog.likes;
  const newLike = currentLike + 1;
  const newObject = { ...updatedBlog, likes: newLike };
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

export default {
  getAll,
  createNew,
  createNewComment,
  update,
  deleteBlog,
  setToken,
  addNewLike,
};
