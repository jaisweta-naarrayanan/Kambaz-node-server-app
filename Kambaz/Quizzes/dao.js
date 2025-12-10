import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import questionModel from "../Questions/model.js";

export default function QuizzesDao(db) {
  async function findQuizzesForCourse(courseId) {
    const quizzes = await model.find({ course: courseId }).lean();
    const quizzesWithCounts = await Promise.all(
      quizzes.map(async (quiz) => {
        const questionCount = await questionModel.countDocuments({ quiz: quiz._id });
        return { ...quiz, questionCount };
      })
    );
    return quizzesWithCounts;
  }

  async function findQuizById(quizId) {
    const quiz = await model.findById(quizId).lean();
    if (quiz) {
      const questionCount = await questionModel.countDocuments({ quiz: quiz._id });
      return { ...quiz, questionCount };
    }
    return null;
  }

  async function createQuiz(courseId, quiz) {
    const newQuiz = { ...quiz, _id: uuidv4(), course: courseId };
    return model.create(newQuiz);
  }

  async function updateQuiz(quizId, quizUpdates) {
    return model.updateOne({ _id: quizId }, { $set: quizUpdates });
  }

  async function deleteQuiz(quizId) {
    return model.deleteOne({ _id: quizId });
  }

  async function publishQuiz(quizId, published) {
    return model.updateOne({ _id: quizId }, { $set: { published } });
  }

  return {
    findQuizzesForCourse,
    findQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    publishQuiz,
  };
}
