import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import ReactDOM from "react-dom";
import Spotted from "../spotted/spotted.component.jsx";
import NewSpotted from "../new-spotted/new-spotted.component.jsx";
import SpottedDetails from "../spotted-details/spotted-details.component.jsx";

import "./app.css";

import FooterIos from "../footer-ios/footer-ios.component.jsx";
import Navbar from "../navbar/navbar.component.jsx";
import { bindActionCreators } from "redux";

import * as locationActions from "../../redux/actions/index";
import { connect } from "react-redux";
import { NEW_SPOTTED } from "../../redux/constants/pages.js";
import Spotteds from "../../../api/spotteds.js";
import TabAndroid from "../tab-android/tab-android.component.jsx";

// App component - represents the whole app

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      pageSize: 10,
      os: "ios"
    };
  }
  renderSpotteds() {
    // return this.props.tasks.map(task => <Task key={task._id} task={task} />);
    return this.props.spotteds.map((spotted, id) => (
      <Spotted
        key={id}
        text={spotted.text}
        source={spotted.source}
        color={spotted.color}
        id={spotted.id}
        comments={spotted.comments}
        likes={spotted.likes}
        isLiked={spotted.isLiked}
      />
    ));
  }

  componentDidMount() {
    console.log(this.props.spotteds);
  }
  renderSpotted() {
    return <SpottedDetails />;
  }
  renderNewSpotted() {
    return <NewSpotted />;
  }
  handleSubmit(event) {
    event.preventDefault();
  }
  render() {
    const { currentLocation, history } = this.props;
    const { changeLocation, previousPage } = this.props.actions;
    const { page, pageSize, os } = this.state;
    return (
      <div className="app">
        <Navbar
          backButtonCallback={() => {
            previousPage();
          }}
          os={os}
          hasActionButton={currentLocation.hasActionButton}
          backButton={currentLocation.backButton}
          title={currentLocation.page}
          goToNewSpottedPage={() => {
            changeLocation(NEW_SPOTTED);
          }}
        />
        {currentLocation.id == "home" && os === "android" && <TabAndroid />}
        <div
          style={{
            position: "fixed",
            // top: 56,
            top: 100,
            left: 16,
            backgroundColor: "red",
            zIndex: 1000,
            color: "white"
          }}
        >
          {/* {this.props.isLoading ? "Loading" : "Loaded"} */}
        </div>
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
        {currentLocation.id == "home" && os === "ios" && <FooterIos />}
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
  // withTracker(() => {
  //   return {
  //     spotteds: Spotteds.find({}).fetch(),
  //   };
  // })(App)
  withTracker(() => {
    const subscriptionHandle = Meteor.subscribe("spotteds", {
      pageSize: 10,
      page: 0
    });

    return {
      isLoading: !subscriptionHandle.ready(),
      spotteds: Spotteds.find({}, { sort: { createdAt: -1 } }).fetch()
    };
  })(App)
);
