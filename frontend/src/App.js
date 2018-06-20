import React, { Component } from "react";
import { insertEntry } from "./database";
import "./App.css";

class App extends Component {
  state = {
    entry: ""
  };

  onChange = e => {
    this.setState({ entry: e.target.value });
  };

  onClick = () => {
    insertEntry(this.state.entry)
      .then(response => {
        this.setState({ entry: "Saved !" });
      })
      .catch(error => {
        this.setState({ entry: "Error happent" });
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">plugable-diary</h1>
        </header>
        <textarea
          value={this.state.entry}
          onChange={this.onChange}
          cols="30"
          rows="10"
        />
        <br />
        <br />
        <button onClick={this.onClick}>Save</button>
      </div>
    );
  }
}

export default App;
