import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import ReactDOM from "react-dom";
import { Tasks } from "../../../api/tasks.js";
import Spotted from "../spotted/spotted.component.jsx";
import NewSpotted from "../new-spotted/new-spotted.component.jsx";
import SpottedDetails from "../spotted-details/spotted-details.component.jsx";

import "./app.css";
import NavbarIOS from "../navbar-ios/navbar-ios.component.jsx";
import FooterIos from "../footer-ios/footer-ios.component.jsx";
import { bindActionCreators } from "redux";

import * as locationActions from "../../redux/actions/index";
import { connect } from "react-redux";
import { NEW_SPOTTED } from "../../redux/constants/pages.js";

// App component - represents the whole app
class App extends Component {
  renderSpotteds() {
    // return this.props.tasks.map(task => <Task key={task._id} task={task} />);
    return this.props.tasks.map((task, id) => (
      <Spotted key={id} text="text" source="source" />
    ));
  }

  renderSpotted() {
    return <SpottedDetails />;
  }
  renderNewSpotted() {
    return <NewSpotted />;
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
          goToNewSpottedPage={() => {
            changeLocation(NEW_SPOTTED);
          }}
        />
        <div className="content">
          {currentLocation.id == "home" ? (
            this.renderSpotteds()
          ) : currentLocation.id == "spotted" ? (
            this.renderSpotted()
          ) : currentLocation.id == "newSpotted" ? (
            this.renderNewSpotted()
          ) : (
            <div>404</div>
          )}
        </div>
        {currentLocation.id == "home" && <FooterIos />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const newState = ({ currentLocation, history } = state);
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
