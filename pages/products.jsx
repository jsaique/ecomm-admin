import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { BsPencilSquare } from "react-icons/bs";

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
      <table className="basic mt-2 ">
        <thead>
          <tr>
            <td>Product name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr>
              <td>{product.title}</td>
              <td>
                <Link href={"/products/edit/" + product._id}>
                  <BsPencilSquare /> Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
