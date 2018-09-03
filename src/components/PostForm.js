import React, { Component } from 'react'

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
    }
  }
  onChange(e) {
    // console.log(e.target.name);
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  onSubmit(e) {
    e.preventDefault();
    const post = {
      title: this.state.title,
      body: this.state.body,
    }
    fetch('https://jsonplaceholder.typicode.com/posts',{
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(post),
    })
    .then(res => res.json())
    .then(data => alert(data.title + ' ' + data.body));
  }
  render() {
    return (
      <div>
        <h1>Add Post</h1>
        <form onChange={this.onChange.bind(this)}
          onSubmit={this.onSubmit.bind(this)}>
          <div>
            <label>Title: </label><br />
            <input type='text' name='title' value={this.state.title} />
          </div>
          <br />
          <div>
            <label>Body: </label><br />
            <input type='text' name='body' value={this.state.body} />
          </div>
          <br />
          <button>Submit</button>
        </form>
        <hr />
      </div>
    )
  }
}
export default PostForm;
