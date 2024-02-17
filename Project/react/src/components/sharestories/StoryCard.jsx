import React from "react";
import Card from "react-bootstrap/Card";
import propTypes from "prop-types";

function StoryCard({ oneStory }) {
  return (
    <React.Fragment>
      <div className="mt-5">
        <Card className="share-stories-card" key={oneStory.id}>
          <Card.Body>
            <div className="share-stories-card-image">
              <Card.Img
                variant="top"
                src={oneStory.url}
                alt="Photo"
                className="share-stories-card img"
              />
            </div>
            <Card.Text className="share-stories-custom-card-text">
              {oneStory.story && oneStory.story.replace(/<\/?p>/g, "")}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="share-stories-card-footer">
            <div>{oneStory.name}</div>
          </Card.Footer>
        </Card>
      </div>
    </React.Fragment>
  );
}
StoryCard.propTypes = {
  oneStory: propTypes.shape({
    id: propTypes.number,
    name: propTypes.string,
    email: propTypes.string,
    story: propTypes.string,
    url: propTypes.string,
  }),
};

export default StoryCard;
