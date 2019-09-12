import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import "./styles.css";
import SwipeableViews from "react-swipeable-views";

function getTextWidth(text, font) {
  // re-use canvas object for better performance
  var canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement("canvas"));
  var context = canvas.getContext("2d");
  context.font = font;
  var metrics = context.measureText(text);
  return metrics.width;
}
const ANIMATION_DURATION = 1060;
export class NativeNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      firstPage: <div></div>,
      secondPage: null,
      currentIndex: 0
    };
    this.push = this.push.bind(this);
    this.mapPages = this.mapPages.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.alert = this.alert.bind(this);
    this.onChangeIndex = this.onChangeIndex.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.initialize = this.initialize.bind(this);
    this.getCurrentPage = this.getCurrentPage.bind(this);
  }

  alert() {
    alert("hello world");
  }
  previousPage() {
    this.props.previousPage();
    this.swipeLeft();
  }
  componentDidMount() {
    this.initialize();
  }

  onFirstPage() {
    const firstPageTitle = document.querySelector(".title-red");
    const firstPageTitleBlack = document.querySelector(".title-red-black");
    firstPageTitleBlack.innerHTML = this.props.pages[0].title;
    const backButton = document.querySelector(".navbar-ios-button");

    const elWidthFirstPageTitle = firstPageTitle.getBoundingClientRect().width;

    let initialPositionFirstPage =
      window.outerWidth / 2 - 26 - elWidthFirstPageTitle / 2;

    firstPageTitle.style = `transition: all ${ANIMATION_DURATION}ms ease; transform: translateX(${initialPositionFirstPage}px); opacity: 0; `;
    firstPageTitleBlack.style = `transition: all ${ANIMATION_DURATION}ms ease; transform: translateX(${initialPositionFirstPage}px); opacity: 1; `;

    const secondPageTitle = document.querySelector(".title-blue");
    secondPageTitle.style = `transition: all ${ANIMATION_DURATION}ms ease; transform: translateX(${window.outerWidth +
      100}px);opacity: 0`;
    backButton.style = `transition: all ${ANIMATION_DURATION}ms ease; opacity: 0`;

    setTimeout(() => {
      secondPageTitle.style = `transition: none; transform: translateX(${window.outerWidth + 200}px);`;
      //   actionButton.style = `transition: none; transform: translateX( ${window.outerWidth +
      //     100}px); opacity: 0.6`;
    
    }, 260);
  }
  onSecondPage() {
    const firstPageTitle = document.querySelector(".title-red");
    const firstPageTitleBlack = document.querySelector(".title-red-black");
    const secondPageTitle = document.querySelector(".title-blue");

    const backButton = document.querySelector(".navbar-ios-button");

    let elWidthSecondPageTitle = secondPageTitle.getBoundingClientRect().width;

    firstPageTitleBlack.innerHTML = this.props.pages[0].title;
    firstPageTitle.innerHTML = this.props.pages[0].title;
    secondPageTitle.innerHTML = this.props.pages[1].title;

    elWidthSecondPageTitle = getTextWidth(
      this.props.pages[this.props.pages.length - 1].title,
      "bold 12pt arial"
    );
    let initialPositionSecondPage =
      window.outerWidth / 2 - 26 - elWidthSecondPageTitle / 2;
    firstPageTitle.style = `transition: all ${ANIMATION_DURATION}ms ease; transform: translateX(0px); opacity: 1; `;
    firstPageTitleBlack.style = `transition: all ${ANIMATION_DURATION}ms ease; transform: translateX(0px); opacity: 0; `;

    secondPageTitle.style = `transition: all  ${ANIMATION_DURATION} ease; transform: translateX(${initialPositionSecondPage}px);opacity: 1`;

    backButton.style = `transition: all ${ANIMATION_DURATION}ms ease; opacity: 1`;
  }

  initialize() {
    if (this.props.pages.length == 1) {
      this.onFirstPage();
    } else if (this.props.pages.length == 2) {
      this.onSecondPage();
    }
    return;
    const backButton = document.querySelector(".navbar-ios-button");
    const firstPageTitle = document.querySelector(".title-red");
    const firstPageTitleBlack = document.querySelector(".title-red-black");
    const secondPageTitle = document.querySelector(".title-blue");
    const elWidthFirstPageTitle = firstPageTitle.getBoundingClientRect().width;
    const middleX = window.outerWidth / 2 - elWidthFirstPageTitle - 2;
    const center = 1 * middleX - 26 * 1;
    let elWidthSecondPageTitle = secondPageTitle.getBoundingClientRect().width;

    if (this.props.pages.length >= 2) {
      elWidthSecondPageTitle = getTextWidth(
        this.props.pages[this.props.pages.length - 1].title,
        "bold 12pt arial"
      );
    }

    // elWidthSecondPageTitle = getTextWidth(this.props.pages[this.props.pages.length-1].title, 'bold 12pt arial');

    let initialPositionSecondPage =
      window.outerWidth / 2 - 26 - elWidthSecondPageTitle / 2;
    let initialPositionFirstPage =
      window.outerWidth / 2 - 26 - elWidthFirstPageTitle / 2;
    const actionButton = document.querySelector(".navbar-ios-create-post");

    if (this.props.pages.length == 1) {
      firstPageTitleBlack.innerHTML = this.props.pages[0].title;

      actionButton.style = "opacity: 0";
      secondPageTitle.style = `transition: all ${ANIMATION_DURATION}ms ease; transform: translateX(${window.outerWidth +
        100});opacity: 0`;
      backButton.style = `transition: all ${ANIMATION_DURATION}ms ease; opacity: 0`;
      firstPageTitle.style = `transition: all ${ANIMATION_DURATION}ms ease; transform: translateX(${initialPositionFirstPage}px); opacity: 0; `;
      firstPageTitleBlack.style = `transition: all ${ANIMATION_DURATION}ms ease; transform: translateX(${initialPositionFirstPage}px); opacity: 1; `;
      // firstPageTitle.style = `display: none`;
    } else {
      if (this.props.pages.length != 0) {
        firstPageTitleBlack.innerHTML = this.props.pages[0].title;
        firstPageTitle.innerHTML = this.props.pages[0].title;
        secondPageTitle.innerHTML = this.props.pages[1].title;
      }
      actionButton.style = "opacity: 0";
      backButton.style = `transition: all ${ANIMATION_DURATION}ms ease; opacity: 1`;
      secondPageTitle.style = `transition: all  ${ANIMATION_DURATION} ease; transform: translateX(${initialPositionSecondPage}px);opacity: 1`;
      // alert(initialPositionSecondPage);
      // secondPageTitle.style = `;opacity: ${event * 0.25}`;
      firstPageTitleBlack.style = `transition: all ${ANIMATION_DURATION}ms ease; left:26px; opacity: 0`;
      firstPageTitle.style = `transition: all ${ANIMATION_DURATION}ms ease; left:26px;`;
      document.querySelector(
        ".middle"
      ).style = `transform: translateX(${window.outerWidth / 2}px)`;

      //   document
      //     .querySelector(".page-red")
      //     .addEventListener("click", function(event) {

      //     });

      let self = this;
    }
  }

  push(component, title) {
    this.props.push(component, title);
    this.swipeRight();
  }

  componentWillReceiveProps(props) {
    this.initialize();
  }
  mapPages(currentPages) {
    console.log(this.props.pages);

    this.initialize();
  }

  getCurrentPage() {
    return (
      this.props.pages.length && this.props.pages[this.props.pages.length - 1]
    );
  }
  onSwipeHandler = (progress, type) => {
    if (this.props.pages.length > 1) {
      const backButton = document.querySelector(".navbar-ios-button");
      const actionButton = document.querySelector(".navbar-ios-create-post");
      const firstPageTitle = document.querySelector(".title-red");
      const firstPageTitleBlack = document.querySelector(".title-red-black");
      const middleReference = document.querySelector(".middle");
      const secondPageTitle = document.querySelector(".title-blue");
      const elWidth = firstPageTitle.getBoundingClientRect().width / 2;
      const middleX = window.outerWidth / 2 - elWidth;

      const normalizedValue = (1 - progress) / 2;
      const output = normalizedValue * 2;
      // const percentWidth = (window.outerWidth / 8) * normalized - 8 * normalized;
      const elWidthSecondPageTitle = secondPageTitle.getBoundingClientRect()
        .width;

      let initialPositionSecondPage =
        window.outerWidth / 2 - 26 - elWidthSecondPageTitle / 2;
      // middleReference.style = `left: ${middleX}px`;
      if (type != "end") {
        const progressNormalized = 1 - progress;
        const normalized = progressNormalized * 2;
        const translateFirstElementToCenter = output * middleX - 26 * output;
        firstPageTitle.style = `transition: none;transform: translateX(${translateFirstElementToCenter}px); opacity: ${progress}`;
        firstPageTitleBlack.style = `transition: none;transform: translateX(${translateFirstElementToCenter}px);opacity: ${progressNormalized}`;
        backButton.style = `opacity: ${progress}`;

        secondPageTitle.style = `transition: none;transform: translateX( ${initialPositionSecondPage +
          (normalized * window.outerWidth) / 2}px);opacity: ${1 - normalized}`;

        actionButton.style = `transition: none;opacity: ${1 - progress}`;
      } else {

        if (progress == 0) {
          this.swipeLeft();
          actionButton.style = "opacity: 1";
        } else {
          this.swipeRight();
          actionButton.style = "opacity: 0";
        }
      }
    }
  };

  swipeLeft(changing) {
    const backButton = document.querySelector(".navbar-ios-button");
    const firstPageTitle = document.querySelector(".title-red");
    const firstPageTitleBlack = document.querySelector(".title-red-black");
    const secondPageTitle = document.querySelector(".title-blue");
    const elWidthFirstPageTitle = firstPageTitle.getBoundingClientRect().width;
    const middleX = window.outerWidth / 2 - elWidthFirstPageTitle;
    const center = 1 * middleX - 26 * 1;
    const elWidthSecondPageTitle = secondPageTitle.getBoundingClientRect()
      .width;
    let initialPositionSecondPage =
      window.outerWidth / 2 - 26 - elWidthSecondPageTitle / 2;
    initialPositionSecondPage -= 0;
    let initialPositionFirstPage =
      window.outerWidth / 2 - 26 - elWidthFirstPageTitle / 2;
    initialPositionFirstPage -= 0;

    secondPageTitle.style = `transition: all ${ANIMATION_DURATION}ms ease;opacity: 0; transform: translateX(1000px)`;
    firstPageTitle.style = `transition: all ${ANIMATION_DURATION}ms ease; transform: translateX(${initialPositionFirstPage}px);opacity: 0;`;

    firstPageTitleBlack.style = `transition: all ${ANIMATION_DURATION}ms ease;transform: translateX(${initialPositionFirstPage}px); opacity: 1`;
    backButton.style = `transition: all ${ANIMATION_DURATION}ms ease; opacity: 0;`;
   
    setTimeout(() => {
      secondPageTitle.style = `transition: none; transform: translateX(1000px);`;
      //   actionButton.style = `transition: none; transform: translateX( ${window.outerWidth +
      //     100}px); opacity: 0.6`;
      try {
        firstPageTitleBlack.innerHTML = self.props.pages[0].title;
      } catch (e) {}

      try {
        firstPageTitleRed.innerHTML = self.props.pages[0].title;
      } catch (e) {}
    }, 1060);
  }
  threshold = false;
  swipeRight() {
    this.threshold = false;
    if (this.threshold) {
      this.threshold = false;
    } else {
      const backButton = document.querySelector(".navbar-ios-button");
      const firstPageTitle = document.querySelector(".title-red");
      const firstPageTitleBlack = document.querySelector(".title-red-black");
      const middleReference = document.querySelector(".middle");
      const secondPageTitle = document.querySelector(".title-blue");

      const elWidth = firstPageTitle.getBoundingClientRect().width / 2;
      const middleX = window.outerWidth / 2 - 26 - elWidth;

      let elWidthSecondPageTitle = secondPageTitle.getBoundingClientRect()
        .width;

      if (this.props.pages.length >= 2) {
        elWidthSecondPageTitle = getTextWidth(
          this.props.pages[this.props.pages.length - 1].title,
          "bold 12pt arial"
        );
      }

      let initialPositionSecondPage =
        window.outerWidth / 2 - 26 - elWidthSecondPageTitle / 2;
      secondPageTitle.style = `transition: all ${ANIMATION_DURATION}ms ease; opacity:1;transform: translateX(${initialPositionSecondPage}px);`;
      firstPageTitle.style = `transition: all ${ANIMATION_DURATION}ms ease;transform: translateX(${0}px);`;
      firstPageTitleBlack.style = `transition: all ${ANIMATION_DURATION}ms ease;transform: translateX(${0}px);`;
      backButton.style = `transition: opacity ${ANIMATION_DURATION}ms ease;opacity: 1;`;

      //   const actionButton = document.querySelector(".navbar-ios-create-post");
      //   actionButton.style = `transition: all ${ANIMATION_DURATION}ms ease;transform: translateX(0px);opacity:1`;
      const self = this;
      setTimeout(() => {
        if (self.props.pages.length >= 2) {
          secondPageTitle.innerHTML =
            self.props.pages[self.props.pages.length - 1].title;
          firstPageTitle.innerHTML =
            self.props.pages[self.props.pages.length - 2].title;
        } else if (self.props.pages.length == 1) {
          secondPageTitle.innerHTML =
            self.props.pages[self.props.pages.length - 1].title;
        }
      }, ANIMATION_DURATION);
    }
  }

  previousPageTitle = "";
  currentPageTitle = "";

  openModal(page) {
    if (this.props.openModal) this.props.openModal(page);
  }
  closeModal() {
    if (this.props.closeModal) this.props.closeModal();
  }
  onChangeIndex(index, index2) {
    console.log("changed", index, index2);
    if (index == 0) {
      this.previousPage();
    }
  }
  render() {
    const {
      children,
      index,
      replace,

      location,
      history,
      staticContext,
      match: routeMatch,

      ...rest
    } = this.props;
    const { firstPage, secondPage } = this.state;
    const pages = this.props.pages.slice(
      this.props.pages.length - 2,
      this.props.pages.length
    );
    const self = this;
    console.log("pages", pages);

    const hasActionButton =
      this.getCurrentPage() && this.getCurrentPage().hasActionButton;
    return (
      <Router>
        <div className="App">
          <div
            style={{
              transform: `translateY(${
                this.props.modalPage ? "0px" : "calc(100vh)"
              })`
            }}
            className="page-modal"
          >
            <div className={`navbar-ios page-modal-title`}>
              <div className={`navbar-ios-title`}>
                {this.props.modalPage && this.props.modalPage.title}
              </div>
              <div
                onClick={() => {
                  this.closeModal();
                }}
                className={`page-modal-close`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 47.971 47.971"
                >
                  <g>
                    <path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88   c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242   C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879   s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z" />
                  </g>
                </svg>
              </div>
            </div>

            <div className="page-modal-content">
              {this.props.modalPage && this.props.modalPage.component}
            </div>
          </div>
          <div className={`navbar-ios`}>
            <div
              onClick={() => {
                self.previousPage();
              }}
              className={`navbar-ios-button`}
            >
              <svg
                className={`navbar-ios-button-icon back`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z" />
              </svg>
            </div>
            <div />
            <div
              onClick={() => {
                self.previousPage();
              }}
              className={`title-red navbar-ios-title`}
            >
              {/* {pages.length == 1 ? pages[0].title : pages.length == 2 && this.props.pages[0].title} */}
            </div>
            <div
              onClick={() => {
                self.previousPage();
              }}
              className={`title-red-black navbar-ios-title`}
            >
              {/* {pages.length == 1 ? pages[0].title : pages.length == 2 && this.props.pages[0].title} */}
            </div>

            <div
              onClick={() => {
                this.openModal({
                  component: (
                    <div style={{ textAlign: "center" }}>Test Modal body</div>
                  ),
                  title: "Test Modal"
                });
              }}
              style={{
                opacity: hasActionButton ? 1 : 0
                // transform: `translateX(${
                //   hasActionButton ? 0 : window.outerWidth * -1
                // }px)`
              }}
              className="navbar-ios-create-post"
            >
              <svg
                style={{ height: "24px", marginRight: "6px" }}
                className="navbar-button-icon"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 1000 1000"
              >
                <g>
                  <path d="M979.3,152.5L847.5,20.7c-7.2-7.2-16.6-10.7-26-10.7c-9.4,0-18.8,3.5-26,10.7L285.6,530.6v183.8h183.8l509.9-510c7.2-7.2,10.7-16.6,10.7-26S986.5,159.6,979.3,152.5z M438.7,622.5h-61.2v-61.2l444-444l61.3,61.3L438.7,622.5z M882.8,469.4c-25.4,0-45.9,20.5-45.9,45.9v382.8h-735v-735h382.8c25.4,0,45.9-20.5,45.9-45.9c0-25.4-20.5-45.9-45.9-45.9H71.3C37.4,71.2,10,98.7,10,132.5v796.2c0,33.8,27.4,61.2,61.3,61.2h796.2c33.8,0,61.3-27.4,61.3-61.3V515.3C928.7,489.9,908.1,469.4,882.8,469.4z" />
                </g>
              </svg>
            </div>

            <div className={`title-blue navbar-ios-title`}></div>
            <div className={`middle`}></div>
          </div>

          <SwipeableViews
            onChangeIndex={this.onChangeIndex}
            index={this.props.pages.length ? this.props.pages.length - 1 : 0}
            // index={0}
            onSwitching={this.onSwipeHandler}
            enableMouseEvents={true}
            axis="x"
            ref="swpv"
          >
            {pages.map((element, index) => {
              return React.createElement(element.component, {
                key: index,
                alert: this.alert,
                push: this.push,
                previousPage: this.previousPage
              });
            })}
          </SwipeableViews>
        </div>
      </Router>
    );
  }
}
