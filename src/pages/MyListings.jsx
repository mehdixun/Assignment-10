import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [editingItem, setEditingItem] = useState(null);


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
        toast.success("Listing deleted successfully");
        setListings(listings.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete listing.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      name: form.name.value,
      category: form.category.value,
      price: Number(form.price.value),
      location: form.location.value,
      description: form.description.value,
    };

    try {
      const res = await fetch(
        `http://localhost:3000/products/${editingItem._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (res.ok) {
        toast.success("Listing updated successfully");

        setListings((prev) =>
          prev.map((item) =>
            item._id === editingItem._id
              ? { ...item, ...updatedData }
              : item
          )
        );
        setEditingItem(null);
      } else {
        toast.error("Failed to update listing ");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="py-20 container mx-auto px-4 min-h-screen">
      <Toaster position="top-center" />
      <h2 className="text-3xl font-bold text-indigo-600 mb-8 text-center">
        My Listings
      </h2>

      {listings.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          You have not added any listings yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div
              key={item._id}
              className="card bg-indigo-50 hover:bg-indigo-100 shadow-lg rounded-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300"
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
                <p className="text-gray-500 font-medium">
                  Category: {item.category}
                </p>
                <p className="text-indigo-600 font-semibold">
                  {item.price && item.price > 0
                    ? `Taka: ${item.price}`
                    : "Free for Adoption"}
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Loacation: {item.location}
                </p>

                <div className="card-actions justify-end mt-4 space-x-2">
                  <button
                    className="btn btn-sm btn-primary hover:bg-indigo-700 hover:scale-105 transition"
                    onClick={() => setEditingItem(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-error hover:scale-105 transition"
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

      {editingItem && (
        <dialog open className="modal modal-open">
          <div className="modal-box bg-white rounded-lg shadow-lg">
            <h3 className="font-bold text-lg mb-4 text-indigo-600">
              Edit Listing
            </h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                name="name"
                defaultValue={editingItem.name}
                className="input input-bordered w-full"
                placeholder="Name"
                required
              />
              <input
                type="text"
                name="category"
                defaultValue={editingItem.category}
                className="input input-bordered w-full"
                placeholder="Category"
                required
              />
              <input
                type="number"
                name="price"
                defaultValue={editingItem.price}
                className="input input-bordered w-full"
                placeholder="Price"
              />
              <input
                type="text"
                name="location"
                defaultValue={editingItem.location}
                className="input input-bordered w-full"
                placeholder="Location"
              />
              <textarea
                name="description"
                defaultValue={editingItem.description}
                className="textarea textarea-bordered w-full"
                placeholder="Description"
              />
              <div className="modal-action flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={() => setEditingItem(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-sm btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyListings;
