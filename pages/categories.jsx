import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";

export default function Categories() {
  const [category, setCategory] = useState("");

  const saveCategory = async function () {
    await axios.post("/api/categories", { category });
    setCategory("");
  };

  return (
    <Layout>
      <h1>Categories</h1>
      <label>New Category name</label>
      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          onChange={(e) => setCategory(e.target.value)}
          type="text"
          className="mb-0"
          placeholder={"Category name"}
          value={category}
        />
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </Layout>
  );
}
