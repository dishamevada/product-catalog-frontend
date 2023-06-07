import logo from './logo.svg';
import './App.css';
import NewProductForm from './NewProductForm';
import SearchProductForm from './SearchProductForm';
import React, { useEffect } from 'react'

const App = () => {
  // Changes tab name
  useEffect(() => {
    document.title = 'Product Catalog';
  }, []);

  return (
    <div className="product-catalog-app">
      <h1 className="product-catalog-title">Product Catalog 📦</h1>
      <NewProductForm />
      <SearchProductForm />
    </div>
  );
}

export default App;
