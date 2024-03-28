/* eslint-disable react/jsx-key */
import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <Layout>
      <h1>Orders</h1>
      <table className="basic mt-4">
        <thead>
          <tr>
            <th>Date</th>
            <th>Paid Status</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={4}>
              {isLoading && (
                <div className="p-2">
                  <Spinner fullWidth={true} />
                </div>
              )}
            </td>
          </tr>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td className={order.paid ? "text-green-600" : "text-red-600"}>
                  {order.paid ? "Yes" : "No"}
                </td>
                <td>
                  {order.name}
                  <br />
                  {order.email}
                  <br />
                  {order.address} <br />
                  {order.city} {order.state} {order.zip}
                </td>
                <td>
                  {order.line_items.map((line) => (
                    <>
                      {line.price_data?.product_data.name} x {line.quantity}
                      <br />
                      <br />
                    </>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
