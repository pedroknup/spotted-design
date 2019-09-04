import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import ReactDOM from "react-dom";
import { Tasks } from "../api/tasks.js";
import Spotted from "./spotted/spotted.component.jsx";

import "./app.css";
import NavbarIOS from "./navbar-ios/navbar-ios.component.jsx";
import FooterIos from "./footer-ios/footer-ios.component.jsx";
// App component - represents the whole app
class App extends Component {
  renderTasks() {
    // return this.props.tasks.map(task => <Task key={task._id} task={task} />);
    return this.props.tasks.map((task, id) => (
      <Spotted key={id} text="text" source="source" />
    ));
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
      <div className="app">
        <NavbarIOS />
        <div className="content">{this.renderTasks()}</div>
        <FooterIos />
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch()
  };
})(App);
