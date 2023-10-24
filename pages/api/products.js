import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  // Get the product
  if (method === "GET") {
    // Get one product to edit
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }
  // Upload the product
  if (method === "POST") {
    const { title, price, description } = req.body;
    const productData = await Product.create({ title, price, description });
    res.json(productData);
  }
  // Update the product
  if (method === "PUT") {
    const { title, price, description, _id } = req.body;
    // _id is the filter, 2nd parameter is what to update
    await Product.updateOne({ _id }, { title, price, description });
    res.json(true);
  }
  // Delete the product
  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query.id });
      res.json(true);
    }
  }
}
