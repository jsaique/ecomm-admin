import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ProductForm({
  _id,
  title: currentTitle,
  price: currentPrice,
  description: currentDescription,
}) {
  const [title, setTitle] = useState(currentTitle || "");
  const [description, setDescription] = useState(currentDescription || "");
  const [price, setPrice] = useState(currentPrice || "");
  const [goToProduct, setGoToProduct] = useState(false);
  const router = useRouter();

  const handleSaveProduct = async function (e) {
    e.preventDefault();
    // If theres an_id Update product if thers none Create
    const data = { title, price, description };
    if (_id) {
      // Update
      await axios.put("/api/products", { ...data, _id });
    } else {
      // Create
      await axios.post("/api/products", data);
    }
    setGoToProduct(true);
  };
  if (goToProduct) {
    router.push("/products");
  }

  return (
    <form onSubmit={handleSaveProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="Product name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Price (USD)</label>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <label>Description</label>
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex gap-2">
        <button className="btn-primary" type="submit">
          Save
        </button>
        <Link className="btn-primary" href={"/products"}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
