import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      password: '',
      title: '',
      author: '',
      url: '',
      error: null,
      message: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedInBlogUser = window.localStorage.getItem('loggedInBlogUser')
    if (loggedInBlogUser) {
      const user = JSON.parse(loggedInBlogUser)
      this.setState({ user })
    }
  }

  handleTextFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  createBlog = async (event) => {
    event.preventDefault()
    try{
      const blog = await blogService.create({
       title: this.state.title,
       author: this.state.author,
       url: this.state.url
      })
      this.setState({ message: `a new blog '${blog.title}' by ${blog.author} added` })
      this.setState({ blogs:[...this.state.blogs, blog]})
      this.setState({ title: '', author: '', url: '' })
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)
    } catch (exception) {
      this.setState({
        error: 'Missing either title or url'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      blogService.setToken(user.token)      
      window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user))

      this.setState({ username: '', password: '', user, message: `Logged in as ${user.username}` })
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)
    } catch (exception) {
      this.setState({
        error: 'Wrong username or password.'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = () => {
    window.localStorage.removeItem('loggedInBlogUser')
    this.setState({ 
      user: null,
      message: "Logged out."
    })
  }

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <Notification error={this.state.error} message={this.state.message} />
          <h2>Log in to application</h2>
          <form onSubmit={this.login}>
            <div>
              username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleTextFieldChange}
              />
            </div>
            <div>
              password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleTextFieldChange}
              />
            </div>
            <div>
              <button type="submit">login</button>
            </div>
          </form>
        </div>
      )
    }
    return (
      <div>
        <h2>blogs</h2>
        <Notification error={this.state.error} message={this.state.message} />
        <p>{this.state.user.name} logged in
          <input type="button" value="logout" style={{margin: 5}} onClick={this.logout}/>
        </p>

        <div>
          <form onSubmit={this.createBlog}>
            <div>
              title:
              <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleTextFieldChange}
              />
            </div>
            <div>
              author:
              <input
                type="text"
                name="author"
                value={this.state.author}
                onChange={this.handleTextFieldChange}
              />
            </div>
            <div>
              url:
              <input
                type="text"
                name="url"
                value={this.state.url}
                onChange={this.handleTextFieldChange}
              />
            </div>
            <div>
              <button type="submit">create</button>
            </div>
          </form>
        </div>

        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    )
  }
}

export default App;
