import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import PropTypes from "prop-types";
import FileUpload from "components/files/FileUpload";
import debug from "sabio-debug";
import Swal from "sweetalert2";
import sharedStoryService from "services/sharedStoryService";

const _logger = debug.extend("EditStoryForm");

function EditStoryForm({ closeModal, storyData }) {
  const initialValues = {
    name: storyData ? storyData.name : "",
    email: storyData ? storyData.email : "",
    story: storyData ? storyData.story : "",
  };

  const onSubmit = (values) => {
    const formData = {
      name: values.name,
      email: values.email,
      story: values.story,
      StoryId: storyData ? storyData.storyId : null,
      FileId: storyData.fileId,
      Url: imageUrl,
      Id: storyData ? storyData.id : null,
    };
    _logger("Form submitted with values", formData);

    sharedStoryService
      .update(storyData.id, formData)
      .then(onSubmitSuccess)
      .catch(onSubmitError);
  };

  const [imageUrl, setImageUrl] = useState(storyData ? storyData.url : "");

  const handleFileUpload = (response) => {
    _logger("Response", response.items);
    if (response.items && response.items.length > 0) {
      const uploadedImageUrl = response.items[0].url;
      setImageUrl(uploadedImageUrl);
      Swal.fire({
        title: "Congrats!",
        text: "Your Image was successfully uploaded!",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Image upload failed. Please try again.",
        icon: "error",
      });
    }
  };

  const onSubmitSuccess = (response) => {
    _logger("Submit Successful!", response);
    Swal.fire({
      title: "Congrats!",
      text: "Your Story has been successfully updated!",
      icon: "success",
    });
    closeModal();
  };

  const onSubmitError = (error) => {
    _logger("Story Submission Error", error);
    Swal.fire({
      title: "Error",
      text: "Your Story submission has failed!",
      icon: "error",
    });
  };

  return (
    <div className="share-stories-form-container">
      <div className="card container">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting, handleChange }) => (
            <Form>
              <h1 className="share-stories-h1">Edit Story</h1>
              <div className="form-group">
                <label className="share-stories-label">Name</label>
                <Field
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
                <br />
              </div>
              <div className="form-group">
                <label className="share-stories-label">Email address</label>
                <Field
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
                <small id="emailHelp" className="form-text text-muted">
                  We will never share your email with anyone else.
                </small>
              </div>
              <br />
              <div className="form-group">
                <label className="share-stories-label">Story</label>
                <Field name="story">
                  {({ field, form }) => (
                    <CKEditor
                      editor={ClassicEditor}
                      data={field.value}
                      onChange={(event, editor) => {
                        form.setFieldValue(field.name, editor.getData());
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="story"
                  component="div"
                  className="text-danger"
                />
              </div>
              <br />
              <div className="share-stories-form-group">
                <label className="share-stories-label">Image</label>
                <FileUpload
                  uploadComplete={handleFileUpload}
                  isMultiple={false}
                />
                <ErrorMessage
                  name="Image"
                  component="div"
                  className="text-danger"
                />
              </div>
              <button
                type="submit"
                className="share-stories-button"
                onClick={onSubmit}
                disabled={isSubmitting}
              >
                Save Changes
              </button>
              <button
                type="button"
                className="share-stories-button"
                onClick={closeModal}
              >
                Cancel
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

EditStoryForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  storyData: PropTypes.shape({
    id: PropTypes.number,
    storyId: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    story: PropTypes.string,
    fileId: PropTypes.number,
    url: PropTypes.url,
  }),
  handleEdit: PropTypes.func.isRequired,
};

export default EditStoryForm;
