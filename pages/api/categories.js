import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handleCategories(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === "GET") {
    res.json(await Category.find().populate("parent"));
  }

  if (method === "POST") {
    const { name, parentCategory, properties } = req.body;
    const categoryData = await Category.create({
      name,
      parent: parentCategory || undefined,
      properties,
    });
    res.json(categoryData);
  }

  if (method === "PUT") {
    const { name, parentCategory, _id, properties } = req.body;
    const categoryData = await Category.updateOne(
      { _id },
      {
        name,
        parent: parentCategory || undefined,
        properties,
      }
    );
    res.json(categoryData);
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    await Category.deleteOne({ _id });
    res.json("ok");
  }
}
