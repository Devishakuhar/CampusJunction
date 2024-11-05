import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom"; // Importing useParams from react-router-dom
import "../styles/ProductDetailPage.css"; // Importing the external CSS
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ProductDetailPage() {
  const { id } = useParams(); // Extract the product ID from the URL
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null); // Default image
  const [rating, setRating] = useState(4); // Product rating (out of 5 stars)
  const [userRating, setUserRating] = useState(0); // User's selected rating
  const [review, setReview] = useState(""); // User's review
  const [reviews, setReviews] = useState([]); // List of customer reviews

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/marketplace/products/${id}`);
        setProduct(response.data);
        if (response.data.images && response.data.images.length > 0) {
          setMainImage(response.data.images[0].url); // Set the first product image as the main image
        }
        setReviews(response.data.reviews);
      } catch (error) {
        console.error('Error fetching product details', error);
      }
    };
    fetchProductDetails();
  }, [id]); // Dependency on id to re-fetch data when id changes

  const handleRating = (newRating) => {
    setUserRating(newRating);
  };


  return (
    <div>
      <Navbar />
      <div className="page-container">
        <div className="productLayout">
          <div className="productImages">
            {/* Thumbnails Section */}
            <div className="thumbnails">
              {/* Use image from public folder */}
              <img
                src={`${process.env.PUBLIC_URL}/photo.png`} 
                alt="Public Thumbnail"
                onClick={() => setMainImage(`${process.env.PUBLIC_URL}/photo.png`)}
                className="thumbnailImage"
              />
              {/* Map through product images if they exist */}
              {product && product.images && product.images.slice(0, 1).map((image, index) => (
                <img
                   key={index}
                   src={image.url}
                   alt={`Thumbnail ${index}`}
                   onClick={() => setMainImage(image.url)}
                   className="thumbnailImage"
                 />
                ))}
            </div>
            <div className="mainImage">
              <img src={mainImage} alt="Main Product" className="mainImageDisplay" />
            </div>
          </div>
          {/* Product Information */}
          {product && (
            <div className="productInfo">
              <h1 className="productTitle">{product.name}</h1>

              <div className="rating">
                {[...Array(5)].map((star, index) => (
                  <span key={index} className={index < product.rating ? "filled-star" : "empty-star"}>★</span>
                ))}
              </div>
              <p className="productDescription">{product.description}</p>
              <p className="productPrice">₹{product.price}</p>
              <p className="productSeller">Sold by: <strong>{product.seller}</strong></p>

              <div className="actionButtons">
                <button className="addToCart">Add to Cart</button>
                <button className="buyNow">Buy Now</button>
              </div>

              {/* User Rating Section */}
              <div className="userRating">
                <h3>Rate this Product:</h3>
                {[...Array(5)].map((star, index) => (
                  <span
                    key={index}
                    className={index < userRating ? "filled-star" : "empty-star"}
                    onClick={() => handleRating(index + 1)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetailPage;
