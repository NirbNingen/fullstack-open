import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewComment } from "./../requests";

interface BlogUser {
  name: string;
}

interface Blog {
  id: string;
  title: string;
  url: string;
  likes: number;
  user: BlogUser;
  comments: string[];
}

interface BlogDetailProps {
  blogs: Blog[];
  handleLikes: (id: string) => void;
}

const BlogDetail = ({ blogs, handleLikes }: BlogDetailProps) => {
  const [newComment, setNewComment] = useState("");
  console.log(`Blogs: ${blogs}`);
  const { id } = useParams<{ id: string }>();
  const blog = blogs.find((blog) => blog.id === id);

  const queryClient = useQueryClient();

  const createBlogCommentMutation = useMutation({
    mutationFn: createNewComment,
    onSuccess: (commentUpdatedObject) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const addComment = (comment: string) => {
    if (!blog) {
      return;
    }

    createBlogCommentMutation.mutate({ id: blog.id, comment });
  };

  if (!blog) {
    return <div>No blog found.</div>;
  }

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newComment.trim() !== "") {
      addComment(newComment);
      setNewComment("");
    }
  };

  console.log(`blog: ${JSON.stringify(blog)}`);
  return (
    <div>
      <div>
        <h3>{blog.title}</h3>
      </div>
      <div>
        <Link to={blog.url}>{blog.url}</Link>
      </div>
      <div>
        {blog.likes} likes
        <button onClick={() => handleLikes(blog.id)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>

      <h3>comments</h3>
      <form onSubmit={handleCommentSubmit}>
        <input
          id="comment"
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder=" write your comment here "
        />
        <button type="submit">add comment</button>
      </form>
      {blog.comments && blog.comments.length > 0 && (
        <ul>
          {blog.comments.map((comment: string, idx: number) => (
            <li key={idx}>{comment}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogDetail;
