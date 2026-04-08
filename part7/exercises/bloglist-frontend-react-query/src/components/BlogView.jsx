import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./../index.css";

const BlogView = ({ blogs }) => {
  console.log(`blogs!: ${JSON.stringify(blogs)}`);
  // const { id } = useParams();
  // const blog = blogs.find((blog) => blog.id === id);

  // if (!blog) {
  //   return <div>No blog found.</div>;
  // }

  const style = {
    border: "solid",
    borderColor: "black",
    paddingLeft: 5,
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      {blogs.map((blog) => {
        return (
          <div className="blogs">
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default BlogView;
