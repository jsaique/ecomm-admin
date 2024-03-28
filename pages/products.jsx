import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import Spinner from "@/components/Spinner";

export default function Products() {
  const [products, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //Fetching the products from mongodb
  useEffect(() => {
    setIsLoading(true);
    axios.get("/api/products").then((response) => {
      setProduct(response.data);
      setIsLoading(false);
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
          {isLoading && (
            <tr>
              <td colSpan={2}>
                <div className="py-4">
                  <Spinner fullWidth={true} />
                </div>
              </td>
            </tr>
          )}
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
