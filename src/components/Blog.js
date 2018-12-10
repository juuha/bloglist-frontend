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

  handleClick = (event) => {
    event.preventDefault()
    this.props.blog.likes = this.props.blog.likes + 1
    this.setState({
      likes: this.state.likes + 1
    })
    this.props.addLike(this.props.blog)
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

    return (
      <div style={blogStyle}>
        <a onClick={this.toggleVisible}>
        {this.props.blog.title} {this.props.blog.author}
        </a>
        <div style={showWhenVisible}>
        <a href={this.props.blog.url}>{this.props.blog.url}</a><br/>
        {this.state.likes} likes <button onClick={this.handleClick}>like</button> <br/>
        added by {this.props.blog.user.name}
        </div>
      </div>
    )
  }
}

export default Blog