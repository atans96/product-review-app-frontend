import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from "./Layout";
import Home from "./Home";
import ReviewForm from "./ReviewForm";
import "./App.css"
import EditReviewPage from "./EditReviewPage";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<ReviewForm />} />
          <Route path="/edit/:id" element={<EditReviewPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;