import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

export default function ProductPreview({ productId, addToCart }) {
  const [product, setProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [permanentImage, setPermanentImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentPrice, setCurrentPrice] = useState("");
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Fetch the selected product details
        const response = await fetch(`https://app-store-dva8g4chd9hjhtbn.eastus-01.azurewebsites.net/api/v1/products/products/${productId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setProduct(data);
        const productImageUrl = `https://app-store-dva8g4chd9hjhtbn.eastus-01.azurewebsites.net/previewImages/${data.imageReviewUrl}`;
        setPermanentImage(productImageUrl);
        setPreviewImage(productImageUrl);
        setCurrentPrice(data.price);
        setCurrentId(data.id);

        // Fetch related products
        const relatedResponse = await fetch('https://app-store-dva8g4chd9hjhtbn.eastus-01.azurewebsites.net/api/v1/products/products');
        if (!relatedResponse.ok) throw new Error('Network response was not ok');
        const products = await relatedResponse.json();
        const sameNameProducts = products.filter(
          prod => prod.name === data.name && prod.id !== productId
        );
        // Include the selected product at the start of the list
        setRelatedProducts([data, ...sameNameProducts]);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleThumbnailHover = (imageReviewUrl) => {
    setPreviewImage(imageReviewUrl);
  };

  const handleThumbnailClick = (imageReviewUrl, product) => {
    setPermanentImage(imageReviewUrl);
    setPreviewImage(imageReviewUrl);
    setCurrentPrice(product.price);
    setCurrentId(product.id);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        image: permanentImage,
        price: currentPrice,
        quantity: 1,
      });
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-preview">
      <div className="preview--img">
        <h2>Product Preview</h2>
        {previewImage ? (
          <img src={previewImage} alt={product.name} />
        ) : (
          <p>Image not available</p>
        )}
      </div>
      <div className="preview--details">
        <div className="details-header">
          <h2>{product.name}</h2>
          <p>Price: {currentPrice}</p>
          <p>ID: {currentId}</p>

          {/* Add the Sizes Available Section */}
          <div className="sizes--section">
            <h3>Sizes Available:</h3>
            <div className="thumbnail-list">
              {product.sizes?.map((size, index) => (
                <div key={index} className="thumbnail-item">
                  <Button type="default">{size}</Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="colors--section">
          <h2>Colors Available:</h2>
          <div className="thumbnail-list">
            {relatedProducts.map((prod, index) => (
              <div
                key={index}
                className="thumbnail-item"
                onMouseEnter={() => handleThumbnailHover(`https://app-store-dva8g4chd9hjhtbn.eastus-01.azurewebsites.net/previewImages/${prod.imageReviewUrl}`)}
                onMouseLeave={() => setPreviewImage(permanentImage)}
                onClick={() => handleThumbnailClick(`https://app-store-dva8g4chd9hjhtbn.eastus-01.azurewebsites.net/previewImages/${prod.imageReviewUrl}`, prod)}
              >
                <img
                  src={`https://app-store-dva8g4chd9hjhtbn.eastus-01.azurewebsites.net/images/${prod.imageUrl}`}
                  alt={`${prod.name} ${index}`}
                />
              </div>
            ))}
          </div>
        </div>
        <Button type="primary" onClick={handleAddToCart} icon={<ShoppingCartOutlined />}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
