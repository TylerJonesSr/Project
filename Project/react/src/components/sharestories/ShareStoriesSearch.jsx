import React from "react";
import PropTypes from "prop-types";

function ShareStoriesSearch({ searchText, handleSearchInputChange }) {
  return (
    <form className="mt-3 mt-lg-0 ms-lg-3 d-flex align-items-center">
      <input
        type="search"
        placeholder="Search Stories..."
        value={searchText}
        onChange={handleSearchInputChange}
        className="ps-6 form-control align-items-center container"
      />
    </form>
  );
}

ShareStoriesSearch.propTypes = {
  searchText: PropTypes.string,
  handleSearchInputChange: PropTypes.function,
};

export default ShareStoriesSearch;
