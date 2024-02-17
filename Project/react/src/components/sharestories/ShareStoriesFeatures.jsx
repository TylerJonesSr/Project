import React from "react";

function ShareStoriesFeatures() {
  return (
    <div className="container">
      <div className="bg-white py-4 shadow-sm">
        <div className="container mx-auto">
          <div className="row justify-content-center">
            <div className="mb-lg-0 mb-4 col-xl-4 col-lg-4 col-md-6">
              <div className="share-stories-icon-wrapper">
                <span className="share-stories-icon-shape bg-light-warning">
                  <i className="fe fe-book" />
                </span>
                <div className="share-stories-icon-text">
                  <h4 className="fw-semi-bold">Enjoy a variety of stories</h4>
                  <p>From businesses in your area</p>
                </div>
              </div>
            </div>
            <div className="mb-lg-0 mb-4 col-xl-4 col-lg-4 col-md-6">
              <div className="share-stories-icon-wrapper">
                <span className="share-stories-icon-shape bg-light-warning">
                  <i className="fe fe-share" />
                </span>
                <div className="share-stories-icon-text">
                  <h4 className="fw-semi-bold">Let the good times roll</h4>
                  <p>Share your story with RumbApp</p>
                </div>
              </div>
            </div>
            <div className="mb-lg-0 mb-4 col-xl-4 col-lg-4 col-md-6">
              <div className="share-stories-icon-wrapper">
                <span className="share-stories-icon-shape bg-light-warning">
                  <i className="fe fe-check" />
                </span>
                <div className="share-stories-icon-text">
                  <h4 className="fw-semi-bold">Find your dream experience</h4>
                  <p>Know what to expect before you arrive</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareStoriesFeatures;
