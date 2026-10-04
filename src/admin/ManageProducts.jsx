import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import productsData from "../products";

function ManageProducts() {
  const { user } = useAuth();

  const [products, setProducts] = useState(() => {
    const savedProducts =
      localStorage.getItem("adminProducts");

    return savedProducts
      ? JSON.parse(savedProducts)
      : productsData;
  });

  const [showForm, setShowForm] = useState(false);
  const [editingProductId, setEditingProductId] =
    useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  if (!user || user.role !== "admin") {
    return (
      <main className="admin-page">
        <div className="admin-access-denied">
          <div className="admin-denied-icon">!</div>

          <p className="admin-label">
            ADMIN PANEL
          </p>

          <h1>Access Denied</h1>

          <p>
            You do not have permission to manage
            products.
          </p>

          <Link
            to="/"
            className="admin-primary-button"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  function saveProducts(updatedProducts) {
    setProducts(updatedProducts);

    localStorage.setItem(
      "adminProducts",
      JSON.stringify(updatedProducts)
    );
  }

  function deleteProduct(productId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );

    saveProducts(updatedProducts);
  }

  function addProduct() {
    if (
      !name.trim() ||
      !description.trim() ||
      !price ||
      !image.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      image: image.trim(),
    };

    saveProducts([
      ...products,
      newProduct,
    ]);

    clearForm();
  }

  function startEdit(product) {
    setEditingProductId(product.id);

    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setImage(product.image);

    setShowForm(true);
  }

  function updateProduct() {
    if (
      !name.trim() ||
      !description.trim() ||
      !price ||
      !image.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const updatedProducts = products.map(
      (product) =>
        product.id === editingProductId
          ? {
              ...product,
              name: name.trim(),
              description:
                description.trim(),
              price: Number(price),
              image: image.trim(),
            }
          : product
    );

    saveProducts(updatedProducts);

    clearForm();
  }

  function clearForm() {
    setName("");
    setDescription("");
    setPrice("");
    setImage("");

    setEditingProductId(null);
    setShowForm(false);
  }

  return (
    <main className="admin-page">
      <div className="admin-products-top">
        <div>
          <p className="admin-label">
            ADMIN PANEL
          </p>

          <h1>Manage Products</h1>

          <p className="admin-welcome">
            Add, edit and manage your store products.
          </p>
        </div>

        <div className="admin-products-actions">
          <Link
            to="/admin"
            className="admin-back-link"
          >
            ← Dashboard
          </Link>

          <button
            type="button"
            className="admin-primary-button"
            onClick={() => {
              if (showForm) {
                clearForm();
              } else {
                setShowForm(true);
              }
            }}
          >
            {showForm
              ? "Close Form"
              : "+ Add Product"}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="admin-product-form">
          <div className="admin-form-heading">
            <div>
              <p className="admin-label">
                PRODUCT
              </p>

              <h2>
                {editingProductId
                  ? "Edit Product"
                  : "Add New Product"}
              </h2>
            </div>
          </div>

          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Product Name</label>

              <input
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
              />
            </div>

            <div className="admin-form-group">
              <label>Price</label>

              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={price}
                onChange={(event) =>
                  setPrice(event.target.value)
                }
              />
            </div>

            <div className="admin-form-group admin-form-full">
              <label>Description</label>

              <textarea
                placeholder="Enter product description"
                value={description}
                onChange={(event) =>
                  setDescription(
                    event.target.value
                  )
                }
                rows="4"
              />
            </div>

            <div className="admin-form-group admin-form-full">
              <label>Image URL</label>

              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={image}
                onChange={(event) =>
                  setImage(event.target.value)
                }
              />
            </div>
          </div>

          <div className="admin-form-buttons">
            <button
              type="button"
              className="admin-primary-button"
              onClick={
                editingProductId
                  ? updateProduct
                  : addProduct
              }
            >
              {editingProductId
                ? "Update Product"
                : "Add Product"}
            </button>

            <button
              type="button"
              className="admin-secondary-button"
              onClick={clearForm}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="admin-products-heading">
        <div>
          <p className="admin-label">
            INVENTORY
          </p>

          <h2>
            {products.length} Products
          </h2>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="admin-empty-state">
          <div>📦</div>

          <h2>No Products Yet</h2>

          <p>
            Add your first product to start building
            your store inventory.
          </p>
        </div>
      ) : (
        <div className="admin-products-grid">
          {products.map((product) => (
            <article
              className="admin-product-card"
              key={product.id}
            >
              <div className="admin-product-image">
                <img
                  src={product.image}
                  alt={product.name}
                />
              </div>

              <div className="admin-product-content">
                <div className="admin-product-meta">
                  <span>PRODUCT</span>

                  <strong>
                    ${product.price.toFixed(2)}
                  </strong>
                </div>

                <h2>{product.name}</h2>

                <p>
                  {product.description}
                </p>

                <div className="admin-product-buttons">
                  <button
                    type="button"
                    className="admin-edit-button"
                    onClick={() =>
                      startEdit(product)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="admin-delete-button"
                    onClick={() =>
                      deleteProduct(
                        product.id
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default ManageProducts;