import React, { useState, useEffect } from "react";
import axios from "./axiosConfig";
import { Link } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';

const Home = () => {
  const [featuredReviews, setFeaturedReviews] = useState([]);
  const [latestReviews, setLatestReviews] = useState([]);
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("/api/reviews");
      const reviews = response.data;

      setFeaturedReviews(reviews.filter((review) => review.featured));
      setLatestReviews(
        reviews.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)
      );
      setTopRatedProducts(
        reviews.sort((a, b) => b.rating - a.rating).slice(0, 3)
      );
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleShowModal = (review) => {
    setReviewToDelete(review);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setReviewToDelete(null);
  };

  const deleteReview = async () => {
    if (reviewToDelete) {
      try {
        await axios.delete(`/api/reviews/${reviewToDelete.id}`);
        fetchReviews(); // Refresh the reviews after deletion
        handleCloseModal();
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
  };

  const ReviewItem = ({ review }) => (
    <div className="review-item">
      <h3>{review.productName}</h3>
      <p>{review.reviewText}</p>
      <p>Rating: {review.rating}/5</p>
      {review.featured && <span className="badge bg-success">Featured</span>}
      <div className="review-actions">
        <Link to={`/edit/${review.id}`} className="btn btn-primary btn-sm">Edit</Link>
        <Button variant="danger" size="sm" onClick={() => handleShowModal(review)}>Delete</Button>
      </div>
    </div>
  );

  return (
    <div>
      <h1>Product Reviews</h1>

      <section className="review-section">
        <h2>Featured Reviews</h2>
        {featuredReviews.length > 0 ? (
          featuredReviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))
        ) : (
          <p>No featured reviews at the moment.</p>
        )}
      </section>

      <section className="review-section">
        <h2>Latest Reviews</h2>
        {latestReviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </section>

      <section className="review-section">
        <h2>Top Rated Products</h2>
        {topRatedProducts.map((product) => (
          <ReviewItem key={product.id} review={product} />
        ))}
      </section>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the review for "{reviewToDelete?.productName}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteReview}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;