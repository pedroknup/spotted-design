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
import { NEW_SPOTTED, PAGE_SPOTTED } from "../../redux/constants/pages.js";
import Spotteds from "../../../api/spotteds.js";
import elasticScroll from "elastic-scroll-polyfill";
import TabAndroid from "../tab-android/tab-android.component.jsx";
import {
  checkBridge,
  getSystemInfo,
  getDeviceId
} from "../../util/react-native-bridge.js";
import { NativeNavbar } from "../native-navbar/native-navbar.jsx";
import { RedView, BlueView } from "./components.js";

// App component - represents the whole app

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      pageSize: 10,
      isNewIOS: true,
      os: "ios",
      pages: [],
      modalPage: null
    };
    this.push = this.push.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  push(component, title, hasActionButton) {
    const pages = this.state.pages;
    const pageToAdd = { component: component, title: title, hasActionButton };
    pages.push(pageToAdd);
    this.setState({
      pages
    });
  }
  openModal(modal) {
    this.setState({
      modal
    });
  }
  closeModal() {
    this.setState({
      modal: null
    });
  }

  previousPage() {
    console.log("previous page");

    let pages = this.state.pages;
    if (pages.length) {
      setTimeout(() => {
        const popped = pages.pop();

        this.setState({ pages });
      }, 50);
    }
  }

  renderSpotteds() {
    return <div>a</div>;
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
    // console.log(this.props.spotteds);
    elasticScroll();
    this.push(
     RedView,
      "Red",
      true
    );
    this.push(
     BlueView,
      "Blue",
      false
    );

    if (checkBridge()) {
      let self = this;
      window.webViewBridge.send(
        "getDeviceId",
        "",
        function(res) {
          const result = JSON.stringify(res);
          if (result.includes("iPhone")) {
            const iOSVersion = result.substring(7, result.length - 3);
            if (parseInt(iOSVersion.replace(",", ".")) > 10.0) {
              self.setState({ isNewIOS: true });
            }
            self.setState({ os: "ios" });
          }
        },
        function(err) {
          alert("lol", err);
        }
      );
      // if (deviceId.includes("iphone")) {
      //   alert("is IOS");
      // }
    }
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
    const { page, pageSize, os, isNewIOS } = this.state;

    return (
      <div style={{ paddingTop: isNewIOS ? "45px" : "0" }} className="app">
        {this.state.pages.length > 0 && (
          <NativeNavbar
            previousPage={this.previousPage}
            push={this.push}
            pages={this.state.pages}
            openModal={this.openModal}
            closeModal={this.closeModal}
            modalPage={this.state.modal}
            ref={"nativeSwipeableRoutes"}
          ></NativeNavbar>
        )}
      </div>
    );
    return (
      <div style={{ paddingTop: isNewIOS ? "45px" : "0" }} className="app">
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
        <div
          style={{
            maxHeight: isNewIOS ? "calc(100vh - 171px)" : "calc(100vh - 100px)"
          }}
          data-elastic
          className="content"
        >
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
