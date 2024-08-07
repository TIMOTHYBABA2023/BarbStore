import React, { useState, useEffect } from "react";
import products from "./products.json";
import images from "./imageHelper";

export default function ProductPreview({ productId }) {
  const [product, setProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [permanentImage, setPermanentImage] = useState("");

  useEffect(() => {
    const foundProduct = products.find((prod) => prod.id === productId);
    setProduct(foundProduct);
    if (foundProduct) {
      setPermanentImage(images[foundProduct.images[0].image_review]);
      setPreviewImage(images[foundProduct.images[0].image_review]);
    }
  }, [productId]);

  const handleThumbnailHover = (imageReview) => {
    setPreviewImage(images[imageReview]);
  };

  const handleThumbnailClick = (imageReview) => {
    setPermanentImage(images[imageReview]);
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
        <h2>{product.name}</h2>
        <p>Price: {product.images[0].price}</p>
        <p>ID: {product.id}</p>
        <div className="colors--section">
          <h2>Colors Available:</h2>
          <div className="thumbnail-list">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={images[img.image]}
                alt={`${product.name} ${index}`}
                onMouseEnter={() => handleThumbnailHover(img.image_review)}
                onMouseLeave={() => setPreviewImage(permanentImage)}
                onClick={() => handleThumbnailClick(img.image_review)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
