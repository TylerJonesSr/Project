import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./ShareStories.css";
import debug from "sabio-debug";
import sharedStoryService from "services/sharedStoryService";
import FileUpload from "components/files/FileUpload";
import shareStoryFormSchema from "components/schemas/shareStoryFormSchema";
import Swal from "sweetalert2";

function ShareStoryForm() {
  const _logger = debug.extend("ShareStoryForm");

  const [displayText, setDisplayText] = useState("Dreams Come To Life");
  const phrases = [
    "Magic Happens",
    "Nightlife Is More Than Just A Venue",
    "Menus Tell A Story",
    "You Will Find Unforgettable Entertainment",
    "The Good Times Roll",
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);

  const updatePhrase = () => {
    setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    const newDisplayText = phrases[(phraseIndex + 1) % phrases.length];
    setDisplayText(newDisplayText);
  };

  let interval;

  const cleanupInterval = () => {
    clearInterval(interval);
  };

  useEffect(() => {
    interval = setInterval(updatePhrase, 5000);

    return () => {
      cleanupInterval();
    };
  }, [phrases, phraseIndex, setDisplayText]);

  const [imageId, setImageId] = useState("");

  const handleFileUpload = (response) => {
    _logger("Response", response.items);
    if (response.items && response.items.length > 0) {
      const uploadedImageId = response.items[0].id;
      setImageId(uploadedImageId);
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

  const initialValues = {
    name: "",
    email: "",
    story: "",
  };

  const onSubmit = (values) => {
    const formData = {
      name: values.name,
      email: values.email,
      story: values.story,
      FileId: imageId,
    };
    _logger("Form submitted with values", formData);

    sharedStoryService
      .insert(formData)
      .then(onSubmitSuccess)
      .catch(onSubmitError);
  };

  const onSubmitSuccess = (response) => {
    _logger("Submit Successful!", response);
    Swal.fire({
      title: "Congrats!",
      text: "Your Story has been submitted successfully!",
      icon: "success",
    }).then(function () {
      window.location.reload();
    });
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
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={shareStoryFormSchema}
        >
          {({ isSubmitting, handleChange }) => (
            <Form>
              <h1 className="share-stories-h1">Share Your Story</h1>
              <h2 className="share-stories-h1">With RumbApp</h2>
              <div className="share-stories-changing-text">
                <span>A Place Where {displayText}</span>
              </div>
              <div className="form-group">
                <label className="share-stories-label">Name</label>
                <Field
                  type="text"
                  className="form-control"
                  id="Name"
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
                  id="Email"
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
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ShareStoryForm;
