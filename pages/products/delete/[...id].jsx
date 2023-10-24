import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProduct() {
  const router = useRouter();
  const goBack = () => router.push("/products");
  const [productInfo, setProductInfo] = useState();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);

  return (
    <Layout>
      <h1>Do you really want to delete {productInfo?.title}?</h1>
      <button className="btn-danger">Yes</button>
      <button onClick={goBack} className="btn-primary">
        No
      </button>
    </Layout>
  );
}
