import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      likes: this.props.blog.likes
    }
  }

  toggleVisible = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  handleClickLike = (event) => {
    event.preventDefault()
    this.props.blog.likes = this.props.blog.likes + 1
    this.setState({
      likes: this.state.likes + 1
    })
    this.props.addLike(this.props.blog)
  }

  handleClickDelete = (event) => {
    event.preventDefault()
    if (window.confirm(`delete '${this.props.blog.title}' by ${this.props.blog.author}?`)){
      this.props.deleteBlog(this.props.blog)
    }
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const showWhenVisible = { display: this.state.visible ? '' : 'none', margin: 5}

    const username = this.props.blog.user ? this.props.blog.user.name : 'no one'

    const showForOwner = { display: (!this.props.blog.user) || (this.props.blog.user.name === this.props.user.name) ? '' : 'none' } 

    return (
      <div style={blogStyle}>
        <a onClick={this.toggleVisible}>
        {this.props.blog.title} {this.props.blog.author}
        </a>
        <div style={showWhenVisible}>
          <a href={this.props.blog.url}>{this.props.blog.url}</a><br/>
          {this.state.likes} likes <button style={{backgroundColor: "lime"}} onClick={this.handleClickLike}>like</button> <br/>
          added by {username}
          <div style={showForOwner}>
            <button style={{backgroundColor: "pink"}} onClick={this.handleClickDelete}>delete</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Blog