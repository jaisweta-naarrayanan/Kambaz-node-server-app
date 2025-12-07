import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    _id: String,
    title: { type: String, default: "Unnamed Quiz" },
    description: { type: String, default: "" },
    course: { type: String, ref: "CourseModel" },
    quizType: {
      type: String,
      enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
      default: "Graded Quiz",
    },
    points: { type: Number, default: 0 },
    assignmentGroup: {
      type: String,
      enum: ["Quizzes", "Exams", "Assignments", "Project"],
      default: "Quizzes",
    },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 }, // in minutes
    multipleAttempts: { type: Boolean, default: false },
    howManyAttempts: { type: Number, default: 1 },
    showCorrectAnswers: { type: String, default: "Immediately" },
    showCorrectAnswersDate: { type: Date },
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: Date,
    availableDate: Date,
    availableUntilDate: Date,
    published: { type: Boolean, default: false },
  },
  { collection: "quizzes" }
);

export default quizSchema;
