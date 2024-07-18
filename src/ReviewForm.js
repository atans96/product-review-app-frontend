import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "./axiosConfig";
import { useNavigate } from "react-router-dom";

const reviewSchema = Yup.object().shape({
  productName: Yup.string().required("Product name is required"),
  rating: Yup.number().min(1).max(5).required("Rating is required"),
  reviewText: Yup.string()
    .required("Review text is required")
    .min(10, "Review must be at least 10 characters"),
});

const ReviewForm = ({ review, onSubmit }) => {
  const navigate = useNavigate();

  const initialValues = review || {
    productName: "",
    rating: "",
    reviewText: "",
  };

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      if (review) {
        await axios.put(`/api/reviews/${review.id}`, values);
      } else {
        await axios.post("/api/reviews", values);
      }
      if (onSubmit) {
        onSubmit();
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setStatus({
        error: "An error occurred while submitting the review. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={reviewSchema}
      onSubmit={handleSubmit}
      enableReinitialize // This ensures the form updates if the review prop changes
    >
      {({ isSubmitting, status }) => (
        <Form>
          <div>
            <label htmlFor="productName">Product Name</label>
            <Field type="text" id="productName" name="productName" />
            <ErrorMessage name="productName" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="rating">Rating</label>
            <Field type="number" id="rating" name="rating" min="1" max="5" />
            <ErrorMessage name="rating" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="reviewText">Review</label>
            <Field as="textarea" id="reviewText" name="reviewText" />
            <ErrorMessage name="reviewText" component="div" className="error" />
          </div>

          {status && status.error && (
            <div className="error">{status.error}</div>
          )}

          <button type="submit" disabled={isSubmitting}>
            {review ? "Update Review" : "Add Review"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ReviewForm;