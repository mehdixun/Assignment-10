import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const categoryMap = {
  All: "",
  Pets: "Pets",
  "Pet Food": "Pet Food",
  Accessories: "Accessories",
  "Pet Care Products": "Pet Care Products",
};

const PetsAndSupplies = () => {
  const [listings, setListings] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const queryParam = categoryMap[filterCategory]
      ? `?category=${encodeURIComponent(categoryMap[filterCategory])}`
      : "";
    fetch(`http://localhost:3000/products${queryParam}`)
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.error("Error fetching listings:", err))
      .finally(() => setLoading(false));
  }, [filterCategory]);

  return (
    <div className="my-10 px-5 container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
         Pets & Supplies
      </h2>

      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {Object.keys(categoryMap).map((cat) => (
          <button
            key={cat}
            className={`btn btn-sm ${
              filterCategory === cat
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFilterCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : listings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {listings.map((item) => (
            <div
              key={item._id}
              className="card bg-indigo-50 shadow-lg rounded-xl hover:scale-105 hover:bg-indigo-100 transition-transform duration-300"
            >
              <figure className="overflow-hidden rounded-t-xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 w-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-xl font-bold">{item.name}</h2>
                <p className="text-gray-500 font-medium">
                  Category: {item.category}
                </p>
                <p className="text-gray-400 text-sm mt-1">Location: {item.location}</p>
                <p className="text-indigo-600 font-semibold mt-1">
                  {item.price && item.price > 0
                    ? `Price: ${item.price}`
                    : "Free for Adoption"}
                </p>

                <div className="card-actions justify-end mt-3">
                  <Link
                    to={`/listing-details/${item._id}`}
                    className="btn btn-sm btn-primary hover:bg-indigo-700 text-white"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center col-span-full text-gray-500">
          No listings found.
        </p>
      )}
    </div>
  );
};

export default PetsAndSupplies;
