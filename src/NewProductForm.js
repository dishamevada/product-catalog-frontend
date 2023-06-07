import React, { useState } from 'react'
import axios from 'axios'


const NewProductForm = () => {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [SKU, setSKU] = useState('')

    // Validates form input and sends the request
    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!name || !category || !SKU) {
            alert('All fields are required');
            return;
        }

        if (name.length > 50 || category.length > 50 || SKU.length > 50) {
            alert('Fields must be less than 50 characters');
            return;
        }

        const formData = { name, category, SKU };
        const path = 'http://localhost:8080/products'
        axios.post(path, formData)
            .then((response) => {
                console.log('Product Created:', response.data);
                setName('');
                setCategory('');
                setSKU('');
                alert('Product Created ✅')
            })
            .catch((error) => {
                const errorMessage = error?.response?.data?.error
                console.error('Error creating product:', errorMessage);
                if (errorMessage.includes('UNIQUE')) {
                    alert('SKU must be unique ❌')
                    return
                }
                alert(errorMessage)
            });
    }

    return (
        <div className="new-product-form-container">
            <form className="new-product-form" onSubmit={handleFormSubmit}>
                <h2 className="new-product-form-title">Add New Product ➕</h2>
                <label>
                    <span>Name</span>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    <span>Category</span>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </label>
                <label>
                    <span>SKU</span>
                    <input
                        type="text"
                        value={SKU}
                        onChange={(e) => setSKU(e.target.value)}
                    />
                </label>
                <button className="submit-button" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewProductForm;
