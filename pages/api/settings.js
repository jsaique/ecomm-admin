import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { Setting } from "@/models/Setting";

export default async function handler(req, res) {
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (req.method === "PUT") {
    const { name, value } = req.body;
    const settingData = await Setting.findOne({ name });
    if (settingData) {
      settingData.value = value;
      await settingData.save();
      res.json(settingData);
    } else {
      res.json(await Setting.create({ name, value }));
    }
  }

  if (req.method === "GET") {
    const { name } = req.query;
    res.json(await Setting.findOne({ name }));
  }
}
