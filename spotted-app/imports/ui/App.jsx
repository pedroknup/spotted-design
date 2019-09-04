import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import ReactDOM from 'react-dom';
import { Tasks } from "../api/tasks.js";
import Task from "./Task.jsx";

// App component - represents the whole app
class App extends Component {
  renderTasks() {
    return this.props.tasks.map(task => <Task key={task._id} task={task} />);
  }
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Tasks.insert({
      text,
      createdAt: new Date() // current time
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = "";
  }
  render() {
    return (
      <div className="container">
        <header></header>

        <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="text"
            ref="textInput"
            placeholder="Type to add new tasks"
          />
        </form>
        {this.renderTasks()}
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(App);
