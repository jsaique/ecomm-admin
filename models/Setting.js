import { Timestamp } from "mongodb";
import { Schema, models, model } from "mongoose";

const settingSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    value: { type: Object },
  },
  { timestamps: true }
);

export const Setting = models?.Setting || model("Setting", settingSchema);
