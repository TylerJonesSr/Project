import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import sharedStoryService from "services/sharedStoryService";
import debug from "sabio-debug";
const _logger = debug.extend("ShareStoriesTable");
import CreateStoryButton from "./CreateStoryButton";
import ShareStoryForm from "./ShareStoryForm";
import EditStoryForm from "./EditStoryForm";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";

function ShareStoriesTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageData, setPageData] = useState({
    arrayOfStories: [],
    storyComponents: [],
    currentPage: 0,
    pageSize: 20,
    searchText: "",
  });

  const [createStorySuccess, setCreateStorySuccess] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editingStory, setEditingStory] = useState(null);
  const [refreshData, setRefreshData] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openEditModal = (story) => {
    setEditingStory(story);
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditingStory(null);
    setEditModalIsOpen(false);
    loadStories();
  };

  const closeCreateStoryModal = () => {
    setCreateStorySuccess(false);
    closeModal();
    loadStories();
  };

  useEffect(() => {
    if (createStorySuccess) {
      closeModal();
      setCreateStorySuccess(false);
      loadStories();
    }
  }, [createStorySuccess]);

  useEffect(() => {
    loadStories();
  }, [pageData.currentPage, pageData.pageSize, searchQuery, refreshData]);

  const loadStories = () => {
    sharedStoryService
      .selectAll(pageData.currentPage, pageData.pageSize)
      .then((response) => {
        _logger(response);
        const storiesArray = response.item.pagedItems;
        setPageData((prevState) => ({
          ...prevState,
          arrayOfStories: storiesArray,
        }));
      })
      .catch((error) => {
        _logger(error);
      });
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    setPageData((prevState) => ({
      ...prevState,
      searchText: searchQuery,
      currentPage: 0,
    }));
  };

  const filteredStories = pageData.arrayOfStories.filter(
    (story) =>
      story.name.toLowerCase().includes(pageData.searchText.toLowerCase()) ||
      story.email.toLowerCase().includes(pageData.searchText.toLowerCase()) ||
      story.story.toLowerCase().includes(pageData.searchText.toLowerCase())
  );

  const handleEditClick = (editedData) => {
    _logger(`Edit button clicked for story with ID ${editingStory.Id}`);
    _logger("Edited Data:", editedData);

    closeEditModal();
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        sharedStoryService
          .delete(id)
          .then(() => {
            _logger(`Story with ID ${id} deleted successfully`);
            Swal.fire("Deleted!", "Your story has been deleted.", "success");
            setRefreshData(true);
          })
          .catch((error) => {
            _logger(`Error deleting story with ID ${id}`, error);
            Swal.fire("Error", "Failed to delete the story.", "error");
          });
      }
    });
  };

  const handlePreviousClick = () => {
    setPageData((prevState) => ({
      ...prevState,
      currentPage: prevState.currentPage - 1,
    }));
  };

  const handleNextClick = () => {
    setPageData((prevState) => ({
      ...prevState,
      currentPage: prevState.currentPage + 1,
    }));
    _logger("Next button clicked");
    loadStories();
  };

  const itemsPerPage = pageData.pageSize;
  const currentPage = pageData.currentPage;
  const totalItems = filteredStories.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <React.Fragment>
      <div className="container">
        <h1 className="share-stories-title-text">Stories Table</h1>
      </div>
      <div className="container text-center">
        <div className="d-flex justify-content-between align-items-center">
          <div className="search-container">
            <input
              className="share-stories-search-input"
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <button
              className="share-stories-search-button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          <br />
          <div>
            <CreateStoryButton openModal={openModal} />
          </div>
        </div>
      </div>
      <br />
      <Modal show={modalIsOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create A Story</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShareStoryForm closeCreateStoryModal={closeCreateStoryModal} />
        </Modal.Body>
      </Modal>
      <div>
        <Table striped="rows" className="share-stories-table">
          <thead className="container">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Story</th>
              <th>Created By</th>
              <th>Story Id</th>
              <th>File Id</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStories.map((story, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{story.name}</td>
                <td>{story.email}</td>
                <td>{story.story && story.story.replace(/<\/?p>/g, "")}</td>
                <td>{story.createdBy}</td>
                <td>{story.storyId}</td>
                <td>{story.fileId}</td>
                <td className="image-cell">
                  {story.url && (
                    <img
                      src={story.url}
                      alt={`Image ${index}`}
                      style={{ width: "300px", height: "200px" }}
                    />
                  )}
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => openEditModal(story)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(story.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="text-center">
          <Button
            type="button"
            variant="primary"
            disabled={currentPage === 0}
            onClick={handlePreviousClick}
          >
            Previous
          </Button>
          <Button
            type="button"
            variant="primary"
            disabled={currentPage === totalPages}
            onClick={handleNextClick}
          >
            Next
          </Button>
        </div>
      </div>
      <Modal show={editModalIsOpen} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditStoryForm
            closeModal={closeEditModal}
            storyData={editingStory}
            handleEdit={handleEditClick}
          />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

ShareStoriesTable.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  story: PropTypes.string,
  createdBy: PropTypes.number,
  storyId: PropTypes.number,
  fileId: PropTypes.number,
  url: PropTypes.string,
};

export default ShareStoriesTable;
