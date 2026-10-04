import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, submitOrder }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "Amman",
    payment: "cash",
  });

  const [errors, setErrors] = useState({});

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName =
        "Please enter your full name.";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email.trim()
      )
    ) {
      newErrors.email =
        "Please enter a valid email.";
    }

    if (!form.phone.trim()) {
      newErrors.phone =
        "Please enter your phone number.";
    }

    if (!form.address.trim()) {
      newErrors.address =
        "Please enter your delivery address.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Create the order
    const newOrder = {
      id: Date.now(),
      customer: {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
      },
      delivery: {
        address: form.address,
        city: form.city,
      },
      payment: form.payment,
      items: cart,
      total: total,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    // Get existing orders
    const savedOrders =
      localStorage.getItem("orders");

    const orders = savedOrders
      ? JSON.parse(savedOrders)
      : [];

    // Save new order
    localStorage.setItem(
      "orders",
      JSON.stringify([
        ...orders,
        newOrder,
      ])
    );

    // Clear cart
    submitOrder();

    navigate("/order-success");
  }

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <div className="checkout-empty">
          <h1>Your cart is empty</h1>

          <p>
            Add some products before checking out.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/products")
            }
          >
            Browse products
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-heading">
        <span>SECURE CHECKOUT</span>

        <h1>Complete your order</h1>

        <p>
          Enter your details to arrange delivery.
        </p>
      </div>

      <div className="checkout-layout">
        <form
          className="checkout-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <section className="checkout-section">
            <h2>
              <span>01</span> Contact information
            </h2>

            <label htmlFor="fullName">
              Full name
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Your full name"
            />

            {errors.fullName && (
              <small className="field-error">
                {errors.fullName}
              </small>
            )}

            <label htmlFor="email">
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />

            {errors.email && (
              <small className="field-error">
                {errors.email}
              </small>
            )}

            <label htmlFor="phone">
              Phone number
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+962 7X XXX XXXX"
            />

            {errors.phone && (
              <small className="field-error">
                {errors.phone}
              </small>
            )}
          </section>

          <section className="checkout-section">
            <h2>
              <span>02</span> Delivery address
            </h2>

            <label htmlFor="address">
              Street address
            </label>

            <textarea
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Building, street, neighborhood"
              rows={3}
            />

            {errors.address && (
              <small className="field-error">
                {errors.address}
              </small>
            )}

            <label htmlFor="city">
              City
            </label>

            <select
              id="city"
              name="city"
              value={form.city}
              onChange={handleChange}
            >
              <option value="Amman">
                Amman
              </option>

              <option value="Zarqa">
                Zarqa
              </option>

              <option value="Irbid">
                Irbid
              </option>

              <option value="Aqaba">
                Aqaba
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </section>

          <section className="checkout-section">
            <h2>
              <span>03</span> Payment method
            </h2>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={
                  form.payment === "cash"
                }
                onChange={handleChange}
              />

              <span>
                <strong>
                  Cash on delivery
                </strong>

                <small>
                  Pay when your order arrives
                </small>
              </span>
            </label>
          </section>

          <button
            className="place-order-button"
            type="submit"
          >
            Place order · $
            {total.toFixed(2)}
          </button>

          <p className="checkout-note">
            Your order will be saved for
            management in the admin panel.
          </p>
        </form>

        <aside className="checkout-summary">
          <h2>Order summary</h2>

          {cart.map((item) => (
            <div
              className="checkout-product"
              key={item.id}
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <div>
                <h3>{item.name}</h3>

                <p>
                  Quantity: {item.quantity}
                </p>
              </div>

              <strong>
                $
                {(
                  item.price * item.quantity
                ).toFixed(2)}
              </strong>
            </div>
          ))}

          <div className="checkout-summary-line">
            <span>Subtotal</span>

            <span>
              ${total.toFixed(2)}
            </span>
          </div>

          <div className="checkout-summary-line">
            <span>Shipping</span>

            <span className="free-shipping">
              Free
            </span>
          </div>

          <div className="checkout-grand-total">
            <span>Total</span>

            <strong>
              ${total.toFixed(2)}
            </strong>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;