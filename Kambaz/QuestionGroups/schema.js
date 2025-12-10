import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: String,
    title: { type: String, default: "New Question Group" },
    quiz: { type: String, ref: "QuizModel" },
    course: { type: String, ref: "CourseModel" },
    pointsPerQuestion: { type: Number, default: 1 },
    pickCount: { type: Number, default: 1 },
  },
  { collection: "questionGroups" }
);

export default schema;
