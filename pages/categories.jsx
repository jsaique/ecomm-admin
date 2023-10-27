import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = function () {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  };

  const saveCategory = async function (e) {
    e.preventDefault();
    const data = { name, parentCategory };

    if (editCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
    fetchCategories();
  };

  const editCategory = function (category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
  };

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit Category ${editedCategory.name}`
          : "Creare new category"}
      </label>
      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="mb-0 cursor-pointer"
          placeholder={"Category name"}
          value={name}
        />
        <select
          onChange={(e) => setParentCategory(e.target.value)}
          className="mb-0"
          value={parentCategory}
        >
          <option value="">No parent category</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Name</td>
            <td>Category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td>
                  <button
                    onClick={() => editCategory(category)}
                    className="mr-1 btn-primary"
                  >
                    Edit
                  </button>
                  <button className="btn-danger">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
