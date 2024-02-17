CreateStoryButton.jsx;

import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ShareStoryForm from "./ShareStoryForm";
import debug from "sabio-debug";
import Button from "react-bootstrap/Button";

const _logger = debug.extend("CreateStoryButton");

function CreateStoryButton() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
    _logger("Form open");
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <Button variant="primary" onClick={openModal}>
        Create A Story
      </Button>
      <Modal
        show={modalIsOpen}
        onHide={closeModal}
        contentLabel="Create Story Modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create A Story</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShareStoryForm closeModal={closeModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CreateStoryButton;
