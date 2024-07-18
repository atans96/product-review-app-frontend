import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from './axiosConfig';
import ReviewForm from './ReviewForm';

const EditReviewPage = () => {
  const [review, setReview] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`/api/reviews/${id}`);
        setReview(response.data);
      } catch (error) {
        console.error("Error fetching review:", error);
        // Handle error (e.g., show error message, redirect to 404 page)
      }
    };

    fetchReview();
  }, [id]);

  const handleSubmit = () => {
    navigate('/');
  };

  if (!review) {
    return <div>Loading...</div>;
  }

  return <ReviewForm review={review} onSubmit={handleSubmit} />;
};

export default EditReviewPage;