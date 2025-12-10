import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    _id: String,
    quiz: { type: String, ref: "QuizModel" },
    questionGroup: { type: String, ref: "QuestionGroupModel" },
    title: { type: String, default: "New Question" },
    type: {
      type: String,
      enum: ["Multiple Choice", "True/False", "Fill in the Blank"],
      default: "Multiple Choice",
    },
    points: { type: Number, default: 0 },
    question: { type: String, default: "" }, // WYSIWYG content
    // Multiple Choice fields
    choices: [String],
    correctAnswer: mongoose.Schema.Types.Mixed, // index for MC, boolean for T/F, not used for Fill
    // Fill in the Blank fields
    // Fill in the Blank fields
    possibleAnswers: [{
      variable: String,
      answers: [String]
    }],
    caseSensitive: { type: Boolean, default: false },
  },
  { collection: "questions" }
);

export default questionSchema;
