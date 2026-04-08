import { Link } from "react-router-dom";

const Userview = ({ blogs }) => {
  console.log(`Blogs: ${JSON.stringify(blogs)}`);

  const calcAmountOFBlogsPerUser = (blogs) => {
    const counts = {};
    blogs.forEach((blog) => {
      const author = blog.user.name;
      const userId = blog.user?.id;
      if (!counts[author]) {
        counts[author] = { count: 1, userId };
      } else {
        counts[author].count += 1;
      }
    });
    return counts;
  };

  const countedBlogs = calcAmountOFBlogsPerUser(blogs);

  console.log(`Counts: ${JSON.stringify(countedBlogs)}`);

  const style = {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
  };
  return (
    <>
      <h2>Users</h2>

      <div style={{ marginLeft: "125px" }}>
        {" "}
        <h3>blogs created</h3>
      </div>
      {Object.entries(countedBlogs).map(([author, { count, userId }]) => (
        <div style={style} key={userId || author}>
          <div style={{ width: "125px" }}>
            <Link to={`/users/${userId}`}>{author}</Link>
          </div>
          <div>{count}</div>
        </div>
      ))}
    </>
  );
};

export default Userview;
