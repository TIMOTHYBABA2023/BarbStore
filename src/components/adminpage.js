import React, { useState } from 'react';

export default function AdminPage() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [product, setProduct] = useState({
        id: '',
        name: '',
        category: '',
        images: []
    });
    const [imageFiles, setImageFiles] = useState([]);
    const [imageReviewFiles, setImageReviewFiles] = useState([]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            setLoggedIn(true);
        } else {
            alert('Invalid credentials');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageUpload = (e) => {
        setImageFiles([...e.target.files]);
    };

    const handleImageReviewUpload = (e) => {
        setImageReviewFiles([...e.target.files]);
    };

    const handleAddImage = () => {
        const images = product.images.concat({
            id: (product.images.length + 1).toString(),
            price: '',
            quantity: '',
            image: imageFiles[0] ? imageFiles[0].name : '',
            image_review: imageReviewFiles[0] ? imageReviewFiles[0].name : '',
            color: '',
            category: ''
        });
        setProduct({ ...product, images });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(product);
    };

    if (!loggedIn) {
        return (
            <div className='adminlogin'>
                <h2>Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }

    return (
        <div>
            <h2>Admin Page</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="id"
                    value={product.id}
                    onChange={handleInputChange}
                    placeholder="Product ID"
                />
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    placeholder="Product Name"
                />
                <input
                    type="text"
                    name="category"
                    value={product.category}
                    onChange={handleInputChange}
                    placeholder="Category"
                />
                <input type="file" multiple onChange={handleImageUpload} />
                <input type="file" multiple onChange={handleImageReviewUpload} />
                <button type="button" onClick={handleAddImage}>Add Image</button>
                <button type="submit">Submit</button>
            </form>
            <div>
                <h3>Product Images</h3>
                <ul>
                    {product.images.map((img, index) => (
                        <li key={index}>
                            <p>Image: {img.image}</p>
                            <p>Review Image: {img.image_review}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}


