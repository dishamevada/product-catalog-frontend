import React, { useState } from 'react'
import axios from 'axios'

const SearchProductForm = () => {
    const [searchText, setSearchText] = useState('')
    const [searchResults, setSearchResults] = useState([])

    // Validates text input and sends the request 
    const handleFormSubmit = (e) => {
        e.preventDefault()

        if (searchText.length === 0) {
            alert('Text is empty');
            return;
        }

        if (searchText.length > 50) {
            alert('Text must be less than 50 characters');
            return;
        }

        const path = 'http://localhost:8080/products'
        axios.get(path,
            {
                params: {
                    search: searchText
                }
            })
            .then((response) => {
                if (response.data === null) {
                    alert('No matching products found 😢')
                    return
                }
                setSearchResults(response.data)
                setSearchText('')
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <div className="search-product-form-container">
            <form className="search-product-form" onSubmit={handleFormSubmit}>
                <h2 className="search-product-form-title">Search Products 🔎</h2>
                <div className="search-bar">
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Enter search text"
                    />
                    <button className="search-button" type="submit">Search</button>
                </div>
            </form>
            {searchResults.length > 0 &&
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>SKU</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((result) => (
                            <tr key={result.id}>
                                <td>{result.name}</td>
                                <td>{result.category}</td>
                                <td>{result.sku}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    );
};

export default SearchProductForm;