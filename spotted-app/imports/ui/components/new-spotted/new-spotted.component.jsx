import React from "react";
import PropTypes from "prop-types";
import "./new-spotted.component.css";
import { bindActionCreators } from "redux";
import { Tasks } from "../../../api/tasks.js";
import * as locationActions from "../../redux/actions/index";
import { connect } from "react-redux";
import { withTracker } from "meteor/react-meteor-data";
import { PAGE_SPOTTED, PAGE_HOME } from "../../redux/constants/pages";

const NewSpotted = props => {
  const [text, setText] = React.useState("");

  const openSpottedDetails = () => {
    const spottedPage = PAGE_SPOTTED;
    spottedPage.backButton = {
      PAGE_HOME
    };
    spottedPage.payload = {
      color,
      text,
      id,
      source,
      comments,
      likes,
      isLiked
    };
    props.actions.changeLocation({
      ...spottedPage
    });
  };

  return (
    <div>
      <div className="new-spotted spotted-purple white-fg">
        <svg
          className="new-spotted-icon new-spotted-more"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 408 408"
        >
          <g>
            <g id="more-horiz">
              <path
                d="M51,153c-28.05,0-51,22.95-51,51s22.95,51,51,51s51-22.95,51-51S79.05,153,51,153z M357,153c-28.05,0-51,22.95-51,51
			s22.95,51,51,51s51-22.95,51-51S385.05,153,357,153z M204,153c-28.05,0-51,22.95-51,51s22.95,51,51,51s51-22.95,51-51
			S232.05,153,204,153z"
              />
            </g>
          </g>
        </svg>

        <div className="new-spotted-text">{text}</div>

        <div className="new-spotted-footer">
          <div className="new-spotted-footer-actions">
            <span className="new-spotted-likes">
              <svg
                className="new-spotted-icon"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 51.997 51.997"
              >
                <path
                  d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905
                  c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478
                  c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014
                  C52.216,18.553,51.97,16.611,51.911,16.242z"
                />
              </svg>
            </span>
            <span className="new-spotted-comments">
              <svg
                className="new-spotted-icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 16.087 16.087"
              >
                <g>
                  <g>
                    <path
                      d="M6.5,3.478c-3.59,0-6.5,2.238-6.5,5c0,1.354,0.701,2.585,1.839,3.485
                      c-0.066,0.918-0.287,2.041-0.927,2.646c1.274,0,2.576-0.798,3.399-1.422c0.684,0.188,1.42,0.291,2.189,0.291
                      c3.59,0,6.5-2.237,6.5-5C13,5.716,10.09,3.478,6.5,3.478z"
                    />
                    <path
                      d="M15.14,8.965C15.687,8.234,16,7.384,16,6.478c0-2.762-2.91-5-6.5-5
                      c-1.58,0-3.028,0.434-4.154,1.154C5.876,2.532,6.43,2.478,7,2.478c3.866,0,7,2.463,7,5.5c0,1.197-0.485,2.306-1.312,3.207
                      c0.821,0.624,2.125,1.424,3.399,1.424C15.181,11.749,15.116,9.843,15.14,8.965z"
                    />
                  </g>
                </g>
              </svg>
            </span>
          </div>
          <span className="new-spotted-distance">source</span>
        </div>
      </div>
      <div className="new-spotted-form">
        <input
          onChange={event => {
            setText(event.target.value);
          }}
          placeholder="Type your Spotted"
        ></input>

        <div className="color-selector">
          <div className="random">
            <div>?</div>
          </div>
          <div className="red">
            <div></div>
          </div>
          <div className="green">
            <div></div>
          </div>
          <div className="blue">
            <div></div>
          </div>
          <div className="yellow">
            <div></div>
          </div>
          <div className="white">
            <div></div>
          </div>
          <div className="purple">
            <div></div>
          </div>
          <div className="black">
            <div></div>
          </div>
          <div className="orange">
            <div></div>
          </div>
        </div>
      </div>

      <div className="post-spotted">
        <div className="policy">
          By proceeding you are stating that you agree to the terms of use and
          privacy policy. We guarantee absolute anonymity.
        </div>
        <button>Publish</button>
      </div>
    </div>
  );
};

NewSpotted.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  _id: PropTypes.string,
  source: PropTypes.string,
  comments: PropTypes.object,
  likes: PropTypes.number,
  isLiked: PropTypes.bool
};

function mapStateToProps(state) {
  return { currentLocation: state.currentLocation };
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
  })(NewSpotted)
);
