import React, { Component } from "react";
import axios from "axios";
import "./App.css";

const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const { data: posts } = await axios.get(apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await axios.post(apiEndpoint, obj);
    const posts = [post, ...this.state.posts];
    console.log(posts);
    this.setState({ posts });
    console.log(post);
  };

  handleUpdate = async post => {
    const uri = "https://jsonplaceholder.typicode.com/posts";
    post.title = "UPDATED";

    // Update Entire Object
    const { data } = await axios.put(uri + "/" + post.id, post);

    console.log(data);

    const posts = [...this.state.posts];
    const indexOfUpdatedPost = posts.indexOf(post);
    posts[indexOfUpdatedPost] = { ...post };
    this.setState({ posts });

    // // Update Properties of Object
    // axios.patch(uri + "/" + post.id, { title: "UPDATED AGAIN" });

    // console.log("Update", post);
  };

  handleDelete = async post => {
    const uri = "https://jsonplaceholder.typicode.com/posts";
    await axios.delete(uri + "/" + post.id);

    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });

    console.log("Delete", post);
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
