import React, { useState } from "react";
import Products from "./Products";
import ProductPreview from "./productPreview";

export default function Homepage() {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProductId(product.id);
  };

  return (
    <div>
      {selectedProductId ? (
        <ProductPreview productId={selectedProductId} />
      ) : (
        <Products onProductClick={handleProductClick} />
      )}
    </div>
  );
}