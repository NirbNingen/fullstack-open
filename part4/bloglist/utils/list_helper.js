const { listeners } = require("../app");
const blog = require("../models/blog");

var _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const emptyList = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  return blogs;
};

const likesWithOneBlog = (testList) => {
  console.log("testlist length: ", testList.length);
  console.log("testlist likes: ", testList[0].likes);
  if (testList.length === 1) {
    console.log("am I reaching here??");
    return testList[0]?.likes;
  } else {
    return 0;
  }
};

const totalLikes = (blogs) => {
  const totalLikes = blogs.reduce((a, blog) => a + blog.likes, 0);
  console.log(`total Likes: ${totalLikes}`);
  return totalLikes;
};

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map((blog) => blog.likes));

  console.log(`Favorite blog likes: ${mostLikes}`);
  const favoriteBlog = blogs.filter((blog) => blog.likes === mostLikes);

  console.log(`FavoriteBlog after filter: ${JSON.stringify(favoriteBlog)}`);

  const favoriteBlogObject = {
    title: favoriteBlog[0].title,
    author: favoriteBlog[0].author,
    likes: favoriteBlog[0].likes,
  };
  console.log(`FavoriteBlog Object: ${JSON.stringify(favoriteBlogObject)}`);

  return favoriteBlogObject;
};

const mostBlogs = (blogs) => {
  const nameCounts = _.countBy(blogs, "author");

  console.log(`nameCounts: ${JSON.stringify(nameCounts)}`);

  const mostOccuringName = _.maxBy(
    _.keys(nameCounts),
    (author) => nameCounts[author]
  );

  console.log(`mostOccuringName: ${mostOccuringName}`);

  const mostBlogsObj = {
    author: mostOccuringName,
    blogs: nameCounts[mostOccuringName],
  };
  return mostBlogsObj;
};
const mostLikes = (blogs) => {
  const combinedAuthors = blogs.reduce((acc, current) => {
    const existingAuthor = acc.find(
      (author) => author.author === current.author
    );
    if (existingAuthor) {
      existingAuthor.likes += current.likes;
    } else {
      acc.push({ ...current });
    }
    return acc;
  }, []);

  let maxObject = { author: "", likes: 0 };
  const values = Object.values(combinedAuthors);

  values.forEach((el) => {
    if (el.likes > maxObject.likes) {
      maxObject.likes = el.likes;
      maxObject.author = el.author;
    }
  });
  return maxObject;
};

module.exports = {
  dummy,
  emptyList,
  totalLikes,
  likesWithOneBlog,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
