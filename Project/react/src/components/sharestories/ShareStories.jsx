import React, { useState, useEffect } from "react";
import "./ShareStories.css";
import sharedStoryService from "../../services/sharedStoryService";
import debug from "sabio-debug";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ShareStoriesHeader from "./ShareStoriesHeader";
import ShareStoriesIntro from "./ShareStoriesIntro";
import ShareStoriesFeatures from "./ShareStoriesFeatures";
import ShareStoriesSearch from "./ShareStoriesSearch";
import StoryList from "./StoryList";
import StoryCard from "./StoryCard";
import ShareStoryCarousel from "./ShareStoriesCarousel";

function ShareStories() {
  const _logger = debug.extend("ShareStories");
  const [pageData, setPageData] = useState({
    arrayOfStories: [],
    storyComponents: [],
    currentPage: 0,
    pageSize: 10,
    searchText: "",
  });

  const handleSearchInputChange = (e) => {
    setPageData((prevState) => ({
      ...prevState,
      searchText: e.target.value,
    }));
  };

  useEffect(() => {
    sharedStoryService
      .selectAll(pageData.currentPage, pageData.pageSize)
      .then((response) => {
        _logger(response);
        const storiesArray = response.item.pagedItems;
        const totalStories = response.item.totalCount;
        setPageData((prevState) => ({
          ...prevState,
          arrayOfStories: storiesArray,
          totalStories,
        }));
      })
      .catch((error) => {
        _logger(error);
      });
  }, [pageData.currentPage, pageData.pageSize]);

  useEffect(() => {
    const filteredStories = pageData.arrayOfStories.filter((story) =>
      story.name.toLowerCase().includes(pageData.searchText.toLowerCase())
    );

    const storyComponents = filteredStories.map((oneStory) => (
      <StoryCard oneStory={oneStory} key={oneStory.id} />
    ));

    setPageData((prevState) => ({
      ...prevState,
      storyComponents,
    }));
  }, [pageData.searchText, pageData.arrayOfStories]);

  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    centerMode: true,
    variableWidth: true,
    prevArrow: <button type="button">Previous</button>,
    nextArrow: <button type="button">Next</button>,
  };

  return (
    <div className="share-stories-body-background">
      <div className="share-stories-overlay">
        <div className="container-fluid">
          <ShareStoriesHeader />
          <ShareStoryCarousel />
          <div>
            <ShareStoriesFeatures />
          </div>
          <div className="container">
            <ShareStoriesIntro />
          </div>
          <br />
          <div className="container">
            <ShareStoriesSearch
              searchText={pageData.searchText}
              handleSearchInputChange={handleSearchInputChange}
            />
          </div>
        </div>
        <StoryList pageData={pageData} settings={settings} />
      </div>
    </div>
  );
}

export default ShareStories;
