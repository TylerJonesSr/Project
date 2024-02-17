import React from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";

function StoryList({ pageData, settings }) {
  return (
    <div>
      <div className="row d-flex justify-content-center mt-4 pb-5">
        <div className="col-8 mb-5">
          <h1 className="share-stories-list montserrat">
            <span className="share-story-text-color">
              Stories From Our Guest
            </span>
          </h1>
        </div>
        {pageData.storyComponents.length > 0 ? (
          <div className="row justify-content-center mt-4">
            <div className="col-8 mb-5">
              <Slider {...settings}>{pageData.storyComponents}</Slider>
            </div>
          </div>
        ) : (
          <p className="share-stories-h1 share-story-text-color">
            No stories to display
          </p>
        )}
      </div>
    </div>
  );
}

StoryList.propTypes = {
  pageData: PropTypes.shape({
    storyComponents: PropTypes.shape.isRequired,
  }).isRequired,
  settings: PropTypes.shape.isRequired,
};

export default StoryList;
