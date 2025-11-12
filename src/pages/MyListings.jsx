import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);

  // Fetch user listings
  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/products?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.error(err));
  }, [user]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    try {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.deletedCount > 0) {
        toast.success("Listing deleted successfully!");
        setListings(listings.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete listing.");
    }
  };

  return (
    <div className="my-20 px-5 container mx-auto">
      <Toaster position="top-center" />
      <h2 className="text-3xl font-bold text-indigo-600 mb-6">My Listings</h2>

      {listings.length === 0 ? (
        <p className="text-center text-gray-500">You have not added any listings yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div
              key={item._id}
              className="card bg-indigo-50 shadow-lg rounded-xl hover:scale-105 transition-transform duration-300"
            >
              <figure className="overflow-hidden rounded-t-xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-xl font-bold">{item.name}</h2>
                <p className="text-gray-500 font-medium">Category: {item.category}</p>
                <p className="text-indigo-600 font-semibold">
                  {item.price && item.price > 0
                    ? `৳${item.price}`
                    : "Free for Adoption"}
                </p>
                <p className="text-gray-400 text-sm mt-1">📍 {item.location}</p>

                <div className="card-actions justify-end mt-4 space-x-2">
                  <button className="btn btn-sm btn-primary">Edit</button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;
