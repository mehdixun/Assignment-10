import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider.jsx";
import toast, { Toaster } from "react-hot-toast";

const AddListing = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    category: "Pets",
    price: "",
    location: "",
    description: "",
    image: "",
    date: "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Price default 0 for pets
    if (formData.category === "Pets") {
      formData.price = 0;
    }

    try {
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.insertedId) {
        toast.success("Listing added successfully!");
        setFormData({
          name: "",
          category: "Pets",
          price: "",
          location: "",
          description: "",
          image: "",
          date: "",
          email: user?.email || "",
        });
      } else {
        toast.error("Failed to add listing.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="card w-full max-w-lg mx-auto my-20 bg-base-100 shadow-2xl">
      <div className="card-body">
        <Toaster position="top-center" reverseOrder={false} />
        <h2 className="text-2xl font-bold text-indigo-600 text-center mb-4">
          Add New Listing
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Product/Pet Name"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* Category */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="Pets">Pets</option>
            <option value="Food">Food</option>
            <option value="Accessories">Accessories</option>
            <option value="Care Products">Care Products</option>
          </select>

          {/* Price */}
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="input input-bordered w-full"
            value={formData.price}
            onChange={handleChange}
            disabled={formData.category === "Pets"}
          />

          {/* Location */}
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="input input-bordered w-full"
            value={formData.location}
            onChange={handleChange}
            required
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered w-full"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>

          {/* Image */}
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            className="input input-bordered w-full"
            value={formData.image}
            onChange={handleChange}
            required
          />

          {/* Date */}
          <input
            type="date"
            name="date"
            className="input input-bordered w-full"
            value={formData.date}
            onChange={handleChange}
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            className="input input-bordered w-full"
            value={formData.email}
            readOnly
          />

          <button type="submit" className="btn bg-indigo-500 text-white w-full hover:bg-indigo-700 transition hover:scale-105">
            Add Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
