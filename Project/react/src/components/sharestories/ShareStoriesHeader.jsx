import React from "react";
import Typed from "react-typed";

function ShareStoriesHeader() {
  return (
    <div>
      <h1 className="display-4 fw-bold share-stories-title-text share-story-text-color">
        Stories Shared
      </h1>
      <h6 className="display-6 fw-bold share-stories-title-text share-story-text-color">
        With Rumbapp
      </h6>
      <div>
        <div className="share-stories-h1 typed-cursor">
          <span className="px-3 px-md-0 share-story-text-color">
            A Place Where
          </span>
          <span className="text-primary ms-2">
            <Typed
              className="share-stories-typed-cursor"
              strings={[
                "Dreams Come To Life",
                "Magic Happens",
                "Nightlife Is More Than Just A Venue",
                "Menus Tell A Story",
                "You Will Find Unforgettable Entertainment",
                "The Good Times Roll",
              ]}
              typeSpeed={60}
              backSpeed={50}
              loop
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default ShareStoriesHeader;
