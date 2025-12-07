import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema(
  {
    _id: String,
    quiz: { type: String, ref: "QuizModel" },
    student: { type: String, ref: "UserModel" },
    answers: [
      {
        questionId: String,
        answer: mongoose.Schema.Types.Mixed, // Can be number (index), boolean, or string
      },
    ],
    score: { type: Number, default: 0 },
    attemptNumber: { type: Number, default: 1 },
    submittedAt: { type: Date, default: Date.now },
  },
  { collection: "quizAttempts" }
);

export default quizAttemptSchema;
