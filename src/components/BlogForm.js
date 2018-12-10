import React from 'react'

const BlogForm = ({ onSubmit, handleChange, title, author, url }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="author"
            value={author}
            onChange={handleChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="url"
            value={url}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm