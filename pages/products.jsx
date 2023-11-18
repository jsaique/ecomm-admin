import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

export default function Products() {
  const [products, setProduct] = useState([]);
  //Fetching the products from mongodb
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProduct(response.data);
    });
  }, []);

  return (
    <Layout>
      <Link href={"/products/new"} className="btn-primary">
        Add new product
      </Link>
      <table className="basic mt-4">
        <thead>
          <tr>
            <th>Product name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>
                <Link
                  className="btn-primary"
                  href={"/products/edit/" + product._id}
                >
                  <BsPencilSquare /> Edit
                </Link>
                <Link
                  className="btn-danger"
                  href={"/products/delete/" + product._id}
                >
                  <BsTrash /> Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
