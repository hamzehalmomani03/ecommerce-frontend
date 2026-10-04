import { useState } from "react";
import ProductCard from "../components/productcard";

function Products({ products, addToCart }) {
  const [searchTerm, setSearchTerm] =
    useState("");

  const [priceFilter, setPriceFilter] =
    useState("all");

  const filteredProducts =
    products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesPrice =
        priceFilter === "all" ||
        (priceFilter === "under-100" &&
          product.price < 100) ||
        (priceFilter === "100-500" &&
          product.price >= 100 &&
          product.price <= 500) ||
        (priceFilter === "over-500" &&
          product.price > 500);

      return (
        matchesSearch &&
        matchesPrice
      );
    });

  return (
    <div>
      <h1>Products</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(
              event.target.value
            )
          }
        />
      </div>

      <div className="filter-container">
        <select
          value={priceFilter}
          onChange={(event) =>
            setPriceFilter(
              event.target.value
            )
          }
        >
          <option value="all">
            All Prices
          </option>

          <option value="under-100">
            Under $100
          </option>

          <option value="100-500">
            $100 - $500
          </option>

          <option value="over-500">
            Over $500
          </option>
        </select>
      </div>

      <div className="products-grid">
        {filteredProducts.map(
          (product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          )
        )}
      </div>

      {filteredProducts.length === 0 && (
        <p className="no-products">
          No products found.
        </p>
      )}
    </div>
  );
}

export default Products;