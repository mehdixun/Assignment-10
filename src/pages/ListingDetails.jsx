import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import OrderModal from "../components/OrderModal";
import { AuthContext } from "../context/AuthContext";

const ListingDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setListing(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!listing) return <div>Loading...</div>;

  return (
    <div className="my-10 px-5 max-w-4xl mx-auto">
      <Toaster position="top-center" />
      <div className="card lg:card-side hover:bg-indigo-100 bg-indigo-50 shadow-xl hover:scale-105 transition-transform duration-300 p-5">
        <figure>
          <img
            src={listing.image}
            alt={listing.name}
            className="h-80 w-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-3xl">{listing.name}</h2>
          <p><strong>Category:</strong> {listing.category}</p>
          <p><strong>Owner's Email:</strong> {listing.email}</p>
          <p><strong>Description:</strong> {listing.description}</p>
          <p>
            <strong>Price:</strong>{" "}
            {listing.price ? `${listing.price} taka` : "Free for Adoption"}
          </p>
          <p><strong>Location:</strong> {listing.location}</p>

          <div className="card-actions mt-4">
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-primary"
            >
              Adopt / Order Now
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <OrderModal
          listing={listing}
          user={user}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ListingDetails;
