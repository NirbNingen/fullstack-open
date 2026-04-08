import axios from "axios";

const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const getBlogs = () => axios.get(baseUrl).then((res) => res.data);

export const createBlog = async (newBlog) => {
  console.log(
    `I reached the blog creation query thing! with ${JSON.stringify(newBlog.blogObject)}`,
  );
  const title = newBlog.blogObject.title;
  console.log(`Title: ${title} & title length: ${title.length}`);
  const length = newBlog.blogObject.title.length;
  console.log(`newAnecdote: ${JSON.stringify(newBlog)} with length ${length}`);
  if (newBlog.blogObject.title.length > 5) {
    console.log("am I somehow passing the chars is longer then 5? ");

    console.log(`Token I found is: ${token}`);

    if (!token) {
      console.error(
        "No token set! Did you forget to call setToken(user.token)?",
      );
      return Promise.reject(new Error("No token set"));
    }
    const config = {
      headers: { Authorization: token },
    };
    console.log(`Calling the backend with config: ${JSON.stringify(config)} `);
    try {
      const response = await axios.post(baseUrl, newBlog.blogObject, config);
      return response.data;
    } catch (error) {
      console.error("Error posting blog:", error);
      throw error;
    }
  } else {
    console.log("Blog content is too short.");
    return Promise.reject(new Error("Blog content is too short."));
  }
};

export const createNewComment = async ({ id, comment }) => {
  const config = {
    headers: { Authorization: token },
  };
  return await axios.post(`${baseUrl}/${id}/comments`, { comment }, config);
};

export const newBlogLike = async (newObject) => {
  console.log(
    `Object coming into the request before transformation: ${JSON.stringify(
      newObject,
    )}`,
  );
  const id = newObject.selectedBlog.id;
  console.log(`Current id: ${id}`);
  const currentLikes = newObject.selectedBlog.likes;
  const increaseLikes = currentLikes + 1;
  console.log(`Increased ${increaseLikes} & current likes: ${currentLikes}`);
  newObject = { ...newObject.selectedBlog, likes: increaseLikes };
  console.log(`New object: ${JSON.stringify(newObject)}`);

  return await axios.put(`${baseUrl}/${id}`, newObject).then((res) => res.data);
};

export const deleteBlog = async (objectId) => {
  console.log(`I have reached the delete blog request! `);

  if (!token) {
    console.error("No token set! Did you forget to call setToken(user.token)?");
    return Promise.reject(new Error("No token set"));
  }
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.delete(`${baseUrl}/${objectId}`, config);
    return response.data;
  } catch (error) {
    console.log(
      `Trouble deleting blog. With payload: id: ${objectId} , and config ${JSON.stringify(config)}}`,
    );
    throw error;
  }
};
