/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { BsUpload } from "react-icons/bs";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
import { goBack } from "@/lib/util";

export default function ProductForm({
  _id,
  title: currentTitle,
  price: currentPrice,
  description: currentDescription,
  images: currentImages,
  category: assignedCategory,
  properties: assignedProperties,
}) {
  const [title, setTitle] = useState(currentTitle || "");
  const [images, setImages] = useState(currentImages || []);
  const [category, setCategory] = useState(assignedCategory || "");
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );
  const [price, setPrice] = useState(currentPrice || "");
  const [description, setDescription] = useState(currentDescription || "");
  const [goToProduct, setGoToProduct] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setCategoriesLoading(true);
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
      setCategoriesLoading(false);
    });
  }, []);

  const handleSaveProduct = async function (e) {
    e.preventDefault();
    // If theres an_id Update product if thers none Create
    const data = {
      title,
      price,
      description,
      images,
      category,
      properties: productProperties,
    };
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
      setIsUploading(true);
      const data = new FormData(); // Gathering our data

      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  };

  const updateImagesOrder = function (images) {
    setImages(images);
  };

  const handleGoBack = function () {
    goBack(router, "/products");
  };

  const setProductProp = function (propName, value) {
    setProductProperties((prev) => {
      const newProductProp = { ...prev };
      newProductProp[propName] = value;
      return newProductProp;
    });
  };

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...catInfo.properties);
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo.parent?._id
      );
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
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
      <label>Category</label>
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="">Uncategorized</option>
        {categories.length > 0 &&
          categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>
      {/* Check if category have a parent  */}
      {categoriesLoading && <Spinner />}
      {propertiesToFill.length > 0 &&
        propertiesToFill.map((property) => (
          <div key={property._id}>
            <label>
              {`${property.name[0].toUpperCase()}${property.name.substring(1)}`}
            </label>
            <div>
              <select
                onChange={(e) => setProductProp(property.name, e.target.value)}
                type="text"
                value={productProperties[property.name]}
              >
                {property.values.map((value, index) => (
                  <option key={`${property._id}-${index}`} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-2">
        <ReactSortable
          list={images}
          className="flex flex-wrap gap-1"
          setList={updateImagesOrder}
        >
          {!!images?.length &&
            images.map((link) => (
              <div
                key={link}
                className="h-24 p-4 bg-stone-200 shadow-sm rounded-sm border border-stone-200"
              >
                <img src={link} alt="" className="rounded-md"></img>
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24 flex items-center ">
            <Spinner />
          </div>
        )}
        <label className="w-24 h-24 flex text-center items-center justify-center gap-1 text-sm rounded-sm bg-stone-300 shadow-sm cursor-pointer">
          <BsUpload />
          <div>Upload</div>
          <input onChange={uploadImages} type="file" className="hidden" />
        </label>
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
        <button onClick={handleGoBack} className="btn-primary" type="button">
          Cancel
        </button>
      </div>
    </form>
  );
}
