import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { BsUpload } from "react-icons/bs";

export default function ProductForm({
  _id,
  title: currentTitle,
  price: currentPrice,
  description: currentDescription,
  images,
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

  const uploadImages = async function (e) {
    const files = e.target?.files;
    if (files?.length > 0) {
      const data = new FormData(); // Gathering our data

      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      console.log(res.data);
    }
  };

  return (
    <form onSubmit={handleSaveProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="Product name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Photos</label>
      <div className="mb-2">
        <label className="w-24 h-24 flex text-center items-center justify-center gap-1 text-sm rounded-lg bg-stone-300 cursor-pointer">
          <BsUpload />
          <div>Upload</div>
          <input onChange={uploadImages} type="file" className="hidden" />
        </label>
        {!images?.length && (
          <div className="text-red-600">No photos in this product</div>
        )}
      </div>
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
