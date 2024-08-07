import React, { useState } from "react";

const AdminDashboard = () => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    category: "",
    images: [
      {
        id: "",
        price: "",
        quantity: "",
        image: "",
        image_review: "",
        color: "",
      },
      {
        id: "",
        price: "",
        quantity: "",
        image: "",
        image_review: "",
        color: "",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e, index) => {
    const { name, value } = e.target;
    const newImages = [...product.images];
    newImages[index][name] = value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: newImages,
    }));
  };

  const handleImageUpload = (e, index, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        const newImages = [...product.images];
        newImages[index][type] = upload.target.result;
        setProduct((prevProduct) => ({
          ...prevProduct,
          images: newImages,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);
    // Save the product to the backend or state management
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product ID:</label>
        <input type="text" name="id" value={product.id} onChange={handleChange} />
      </div>
      <div>
        <label>Product Name:</label>
        <input type="text" name="name" value={product.name} onChange={handleChange} />
      </div>
      <div>
        <label>Category:</label>
        <input type="text" name="category" value={product.category} onChange={handleChange} />
      </div>
      {product.images.map((img, index) => (
        <div key={index}>
          <h3>Image {index + 1}</h3>
          <div>
            <label>Image ID:</label>
            <input type="text" name="id" value={img.id} onChange={(e) => handleImageChange(e, index)} />
          </div>
          <div>
            <label>Price:</label>
            <input type="text" name="price" value={img.price} onChange={(e) => handleImageChange(e, index)} />
          </div>
          <div>
            <label>Quantity:</label>
            <input type="text" name="quantity" value={img.quantity} onChange={(e) => handleImageChange(e, index)} />
          </div>
          <div>
            <label>Color:</label>
            <input type="text" name="color" value={img.color} onChange={(e) => handleImageChange(e, index)} />
          </div>
          <div>
            <label>Category:</label>
            <input type="text" name="category" value={img.category} onChange={(e) => handleImageChange(e, index)} />
          </div>
          <div>
            <label>Image:</label>
            <input type="file" onChange={(e) => handleImageUpload(e, index, "image")} />
          </div>
          <div>
            <label>Image Review:</label>
            <input type="file" onChange={(e) => handleImageUpload(e, index, "image_review")} />
          </div>
        </div>
      ))}
      <button type="submit">Save Product</button>
    </form>
  );
};

export default AdminDashboard;
