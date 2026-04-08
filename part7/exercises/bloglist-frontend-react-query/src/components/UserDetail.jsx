import { useParams } from "react-router-dom";

const UserDetail = ({ blogs }) => {
  const { id } = useParams();
  const userBlogs = blogs.filter((blog) => blog.user?.id === id);

  if (userBlogs.length === 0) {
    return <div>No blogs found for this user.</div>;
  }

  const user = userBlogs[0].user;

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetail;
