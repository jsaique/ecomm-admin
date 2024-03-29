import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

function SettingsPage({ swal }) {
  const [products, setProducts] = useState([]);
  const [featuredProductId, setFeaturedProductId] = useState("");
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [isLoadingFeaturedProduct, setIsLoadingFeaturedProduct] =
    useState(false);

  useEffect(() => {
    setIsLoadingProduct(true);
    axios.get("/api/products").then((res) => {
      setProducts(res.data);
      setIsLoadingProduct(false);
    });
    setIsLoadingFeaturedProduct(true);
    axios.get("/api/settings?name=featuredProductId").then((res) => {
      setFeaturedProductId(res.data.value);
      setIsLoadingFeaturedProduct(false);
    });
  }, []);

  async function saveSettings() {
    await axios
      .put("/api/settings", {
        name: "featuredProductId",
        value: featuredProductId,
      })
      .then(() => {
        swal.fire({
          title: "Settings saved!",
          icon: "success",
        });
      });
  }

  return (
    <Layout>
      <h1>Settings</h1>
      {(isLoadingProduct || isLoadingFeaturedProduct) && (
        <Spinner fullWidth={true} />
      )}
      {!isLoadingProduct && !isLoadingFeaturedProduct && (
        <>
          <label>Featured product</label>
          <select
            value={featuredProductId}
            onChange={(e) => setFeaturedProductId(e.target.value)}
          >
            {products.length > 0 &&
              products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.title}
                </option>
              ))}
          </select>
          <div>
            <button onClick={saveSettings} className="btn-primary">
              Save
            </button>
          </div>
        </>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }) => <SettingsPage swal={swal} />);
