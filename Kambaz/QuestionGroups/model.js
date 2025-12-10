import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("QuestionGroupModel", schema);

export default model;
