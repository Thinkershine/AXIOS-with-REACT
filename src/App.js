import React, { Component } from "react";
import http from "./services/httpService";
import config from "./config.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const { data: posts } = await http.get(config.apiEndPoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(config.apiEndPoint, obj);
    const posts = [post, ...this.state.posts];
    console.log(posts);
    this.setState({ posts });
    console.log(post);
  };

  handleUpdate = async post => {
    post.title = "UPDATED";

    // Update Entire Object
    const { data } = await http.put(config.apiEndPoint + "/" + post.id, post);

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
    const cachedOriginalPosts = this.state.posts;

    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });

    try {
      await http.delete("S" + config.apiEndPoint + "/" + post.id);
      throw new console.error("ERROR HAPPENED!");
    } catch (ex) {
      console.log("REQ : " + ex.request);

      if (ex.response && ex.response.status === 404) {
        alert("Resource Not Found");
      }

      this.setState({ posts: cachedOriginalPosts });
    }

    console.log("Delete", post);
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
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
