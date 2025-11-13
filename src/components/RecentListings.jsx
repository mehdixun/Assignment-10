import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RecentListings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products/recent")
      .then((res) => res.json())
      .then((data) => {
        
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setListings(shuffled);
      })
      .catch((err) => console.error("Error fetching listings:", err));

    document.title = "Recent Listings | Pawmart";
  }, []);

  return (
    <div className="my-10 px-5 container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
         Recent Pet Listings
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {listings.map((pet) => (
          <div
            key={pet._id}
            className="card bg-indigo-50 shadow-lg rounded-xl hover:scale-105 hover:bg-indigo-100 transition-transform duration-300"
          >
            <figure className="overflow-hidden rounded-t-xl">
              <img
                src={pet.image}
                alt={pet.name}
                className="h-48 w-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title text-xl font-bold">{pet.name}</h2>
              <p className="text-gray-500 font-medium">
                Category: {pet.category}
              </p>
              <p className="text-indigo-600 font-semibold">
                {pet.price && pet.price > 0
                  ? `Price: ${pet.price} Taka`
                  : "Free for Adoption"}
              </p>
              <p className="text-gray-400 text-sm mt-1">Location: {pet.location}</p>

              <div className="card-actions justify-end mt-4">
                <Link
                  to={`/listing-details/${pet._id}`}
                  className="btn btn-sm btn-primary hover:bg-indigo-700 text-white"
                >
                  See Details
                </Link>
              </div>
            </div>
          </div>
        ))}

        {listings.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            No listings found.
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentListings;
