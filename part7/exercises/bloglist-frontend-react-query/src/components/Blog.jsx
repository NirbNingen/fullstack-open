import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteBlog } from "./../requests";
import { useQueryClient } from "@tanstack/react-query";
import { useNotify } from "./../context/NotificationContext";
import "./../index.css";

const Blog = ({ blog, loggedInUser, setShouldFetch, handleLikes }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const notify = useNotify();
  const queryClient = useQueryClient();

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: "solid",
  //   borderWidth: 1,
  //   marginBottom: 5,
  // };

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const deleteBlogAction = async (title, id) => {
    const text = `Do you want to delete ${title} ?`;
    const userConfirmed = confirm(text);

    try {
      if (userConfirmed) {
        // const response = await blogService.deleteBlog(id)
        console.log(`What is the id in the component: ${id}`);
        // dispatch(deleteBlogAction(id));
        deleteBlogMutation.mutate(id);
        notify(`you deleted '${title}'`);

        console.log(`${title} has been deleted.`);
      } else {
        console.log(`User does not want to delete ${title}`);
      }
    } catch (error) {
      console.log(`Blog could not be deleted due to: ${error}`);
    }
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <>
          {blog.title} - {blog.author}
        </>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title} - {blog.author}{" "}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button
            id="like-button"
            onClick={() => {
              console.log("Like button clicked!");
              handleLikes(blog);
            }}
          >
            like
          </button>
          {console.log("handleLikes function reference:", handleLikes)}
        </div>
        {console.log(`Logged in user: ${loggedInUser}`)}
        {console.log(`Blog user name: ${blog?.user?.name}`)}
        {blog?.user?.username === loggedInUser && (
          <button
            id="remove-button"
            onClick={() => deleteBlogAction(blog.title, blog.id)}
          >
            remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
