import React, { useState } from "react";
import Products from "./Products";
import ProductPreview from "./productPreview";

export default function Homepage({ addToCart }) {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProductId(product.id);
  };

  return (
    <div>
      {selectedProductId ? (
        <ProductPreview productId={selectedProductId} addToCart={addToCart} />
      ) : (
        <Products onProductClick={handleProductClick} />
      )}
    </div>
  );
}
