import Layout from "@/components/Layout";
import { goBack } from "@/lib/util";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProduct() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const { id } = router.query;

  const handleGoBack = () => {
    goBack(router);
  };

  const handleDeleteProduct = async () => {
    await axios.delete("/api/products?id=" + id);
    goBack(router);
  };

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
      <h1 className="text-center mt-8">
        Do you really want to delete "{productInfo?.title}"?
      </h1>
      <div className="flex gap-2 justify-center items-center">
        <button onClick={handleDeleteProduct} className="btn-danger">
          Yes
        </button>
        <button onClick={handleGoBack} className="btn-primary">
          No
        </button>
      </div>
    </Layout>
  );
}
