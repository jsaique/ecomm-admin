import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handleCategories(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === "GET") {
    res.json(await Category.find().populate("parent"));
  }

  if (method === "POST") {
    const { name, parentCategory } = req.body;
    const categoryData = await Category.create({
      name,
      parent: parentCategory,
    });
    res.json(categoryData);
  }

  if (method === "PUT") {
    const { name, parentCategory, _id } = req.body;
    const categoryData = await Category.updateOne(
      { _id },
      {
        name,
        parent: parentCategory,
      }
    );
    res.json(categoryData);
  }
}
