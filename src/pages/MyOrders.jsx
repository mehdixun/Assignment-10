import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/orders?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, [user]);

  return (
    <div className="my-20 px-5 container mx-auto">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found 😕</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-indigo-100">
              <tr>
                <th>Product Name</th>
                <th>Buyer Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Address</th>
                <th>Date</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-indigo-50">
                  <td>{order.productName}</td>
                  <td>{order.name}</td>
                  <td>
                    {order.price && order.price > 0
                      ? `৳${order.price}`
                      : "Free for Adoption"}
                  </td>
                  <td>{order.quantity}</td>
                  <td>{order.address}</td>
                  <td>{order.date}</td>
                  <td>{order.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
