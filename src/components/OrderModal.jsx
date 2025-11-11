import React, { useState } from "react";
import toast from "react-hot-toast";

const OrderModal = ({ listing, user, onClose }) => {
  const [formData, setFormData] = useState({
    buyerName: user.displayName || "",
    email: user.email,
    listingId: listing._id,
    listingName: listing.name,
    quantity: listing.category.toLowerCase() === "pet" ? 1 : 1,
    price: listing.price || 0,
    address: "",
    date: "",
    phone: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.insertedId) {
        toast.success("Order placed successfully!");
        onClose();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 btn btn-sm btn-circle"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">Place Your Order</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="buyerName"
            value={formData.buyerName}
            readOnly
            className="input input-bordered w-full"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="listingId"
            value={formData.listingId}
            readOnly
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="listingName"
            value={formData.listingName}
            readOnly
            className="input input-bordered w-full"
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            readOnly={listing.category.toLowerCase() === "pet"}
            className="input input-bordered w-full"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            readOnly
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="date"
            name="date"
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <textarea
            name="notes"
            placeholder="Additional Notes"
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
          />
          <button type="submit" className="btn btn-primary w-full mt-2">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
