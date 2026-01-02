const _ = require('lodash');
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if(blogs.length === 0){
    return null
  }

  const maxLikesBlog = blogs.reduce((prev, current) => current.likes > prev.likes ? current : prev )

  return {
    title: maxLikesBlog.title,
    author: maxLikesBlog.author,
    likes: maxLikesBlog.likes,
  }
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0) return null;

  const blogCounts = _.countBy(blogs, 'author');
  const maxAuthor = _.maxBy(Object.keys(blogCounts), (author) => blogCounts[author]);

  return {
    author: maxAuthor,
    blogs: blogCounts[maxAuthor]
  }
}

const mostLikes = (blogs) => {

  if (blogs.length === 0) return null;

  const grouped = _.groupBy(blogs, 'author');

  const authorLikes = _.map(grouped, (authorBlogs, author) => ({
    author,
    likes: _.sumBy(authorBlogs, 'likes')
  }))

  return _.maxBy(authorLikes, 'likes');
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs, 
  mostLikes
};
