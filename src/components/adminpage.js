import React, { useEffect, useState } from "react";
import { Table, Button, Modal, message, Checkbox } from "antd";

export default function AdminPage(){

  const [products, setProducts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    productId: "",
    price: "",
    quantity: "",
    color: "",
    sizes: [],
    productImage: null,
    previewImage: null,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch("https://app-store-dva8g4chd9hjhtbn.eastus-01.azurewebsites.net/api/v1/products/products")
      .then(response => response.json())
      .then(responseData => {
        if (Array.isArray(responseData)) {
          setProducts(responseData);
        } else {
          console.error("Expected an array in response data but got:", responseData);
        }
      })
      .catch(error => console.error("Error fetching products:", error));
  };

  const handleAddProduct = () => {
    setFormData({
      name: "",
      category: "",
      productId: "",
      price: "",
      quantity: "",
      color: "",
      sizes: [],
      productImage: null,
      previewImage: null,
    });
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    setEditingProduct(null);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSizeCheckboxChange = checkedValues => {
    setFormData(prevFormData => ({
      ...prevFormData,
      sizes: checkedValues,
    }));
  };

  const handleFileChange = e => {
    const { name, files } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: files[0],
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === "sizes") {
        formDataObj.append(key, formData[key].join(","));
      } else if (formData[key] !== null) {
        formDataObj.append(key, formData[key]);
      }
    });

    fetch("https://app-store-dva8g4chd9hjhtbn.eastus-01.azurewebsites.net/api/v1/products/addProduct", {
      method: "POST",
      body: formDataObj,
    })
      .then(response => response.json())
      .then(data => {
        if (data.httpStatus === "OK") {
          message.success(data.message);
          handleCancel();
          fetchProducts();
        } else {
          message.error(data.message || "Failed to add product");
        }
      })
      .catch(error => {
        console.error("Error adding product:", error);
        message.error("Failed to add product");
      });
  };

  const handleEdit = product => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      category: product.category || "",
      productId: product.productId || "",
      price: product.price || "",
      quantity: product.quantity || "",
      color: product.color || "",
      sizes: product.sizes || [],
      productImage: null,
      previewImage: null,
    });
    setIsEditing(true);
  };

  const handleEditSubmit = e => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === "sizes") {
        formDataObj.append(key, formData[key].join(","));
      } else if (formData[key] !== null) {
        formDataObj.append(key, formData[key]);
      }
    });

    fetch(`https://app-store-dva8g4chd9hjhtbn.eastus-01.azurewebsites.net/api/v1/products/editProduct/${editingProduct.id}`, {
      method: "PUT",
      body: formDataObj,
    })
      .then(response => response.json())
      .then(data => {
        if (data.httpStatus === "OK") {
          message.success(data.message);
          handleCancel();
          fetchProducts();
        } else {
          message.error(data.message || "Failed to update product");
        }
      })
      .catch(error => {
        console.error("Error updating product:", error);
        message.error("Failed to update product");
      });
  };

  const handleDelete = id => {
    fetch(`/api/v1/products/deleteProduct/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.httpStatus === "OK") {
          message.success(data.message);
          fetchProducts();
        } else {
          message.error(data.message || "Failed to delete product");
        }
      })
      .catch(error => {
        console.error("Error deleting product:", error);
        message.error("Failed to delete product");
      });
  };

  const handleToggleHide = (id, currentHideStatus) => {
    fetch(`https://app-store-dva8g4chd9hjhtbn.eastus-01.azurewebsites.net/api/v1/products/hideProduct/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hideProduct: !currentHideStatus }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.httpStatus === "OK") {
          message.success(`Product is now ${!currentHideStatus ? "hidden" : "visible"}`);
          fetchProducts();
        } else {
          message.error(data.message || "Failed to toggle product visibility");
        }
      })
      .catch(error => {
        console.error("Error toggling product visibility:", error);
        message.error("Failed to toggle product visibility");
      });
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (text, record) =>
        record.imageUrl ? (
          <img
            src={`https://app-store-dva8g4chd9hjhtbn.eastus-01.azurewebsites.net/api/v1/products/images/${record.imageUrl}`}
            alt={record.name}
            width="100"
          />
        ) : (
          <span>No Image</span>
        ),
    },
    {
      title: "Preview Image",
      dataIndex: "imageReviewUrl",
      key: "imageReviewUrl",
      render: (text, record) =>
        record.imageReviewUrl ? (
          <img
            src={`https://app-store-dva8g4chd9hjhtbn.eastus-01.azurewebsites.net/api/v1/products/${record.imageReviewUrl}`}
            alt={`${record.name} Preview`}
            width="100"
          />
        ) : (
          <span>No Preview</span>
        ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock remaining",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            type="danger"
            onClick={() => handleDelete(record.id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </Button>
          <Button
            onClick={() => handleToggleHide(record.id, record.hideProduct)}
            style={{ marginLeft: "10px" }}
          >
            {record.hideProduct ? "Unhide" : "Hide"}
          </Button>
        </div>
      ),
    },
  ];

  const sizeOptions = [
    { label: "12", value: "12" },
    { label: "15", value: "15" },
    { label: "30", value: "30" },
    { label: "35", value: "35" },
    { label: "45", value: "45" },
  ];

  return (
    <div className="adminPage">
    <div className="admin--page">
      <h1>Product List</h1>
      <Button type="primary" onClick={handleAddProduct}>
        Add Product
      </Button>
      <Table dataSource={products} columns={columns} rowKey="id" />
      <Modal
        title={isEditing ? "Edit Product" : "Add Product"}
        open={isAdding || isEditing}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={isEditing ? handleEditSubmit : handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Product ID:</label>
            <input
              type="text"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Color:</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Sizes:</label>
            <Checkbox.Group
              options={sizeOptions}
              value={formData.sizes}
              onChange={handleSizeCheckboxChange}
            />
          </div>
          <div>
            <label>Product Image:</label>
            <input
              type="file"
              name="productImage"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
          <div>
            <label>Preview Image:</label>
            <input
              type="file"
              name="previewImage"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
          <Button type="primary" htmlType="submit">
            {isEditing ? "Update Product" : "Add Product"}
          </Button>
        </form>
      </Modal>
    </div>
    </div>
  );


}

