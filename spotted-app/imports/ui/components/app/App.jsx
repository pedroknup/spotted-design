import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import ReactDOM from "react-dom";
import { Tasks } from "../../../api/tasks.js";
import Spotted from "../spotted/spotted.component.jsx";

import "./app.css";
import NavbarIOS from "../navbar-ios/navbar-ios.component.jsx";
import FooterIos from "../footer-ios/footer-ios.component.jsx";
import { bindActionCreators } from "redux";

import * as locationActions from "../../redux/actions/index";
import { connect } from "react-redux";

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
    const { currentLocation, history } = this.props;
    const { changeLocation, previousPage } = this.props.actions;
    return (
      <div className="app">
        <NavbarIOS
          backButtonCallback={() => {
            previousPage();
          }}
          hasActionButton={currentLocation.hasActionButton}
          backButton={currentLocation.backButton}
          title={currentLocation.page}
        />
        <div className="content">{this.renderTasks()}</div>
        <code style={{ wordBreak: "break-all", width: "100%" }}>
          {JSON.stringify(history)}
        </code>
        
        <FooterIos />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const newState =  {currentLocation, history} = state;
  return { ...newState };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(locationActions, dispatch) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withTracker(() => {
    return {
      tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch()
    };
  })(App)
);
