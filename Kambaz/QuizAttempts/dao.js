import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function QuizAttemptsDao(db) {
  async function findAttemptsForStudent(quizId, studentId) {
    return model.find({ quiz: quizId, student: studentId }).sort({ attemptNumber: -1 });
  }

  async function findAttemptById(attemptId) {
    return model.findById(attemptId);
  }

  async function createAttempt(attempt) {
    const newAttempt = { ...attempt, _id: uuidv4() };
    return model.create(newAttempt);
  }

  async function deleteAttemptsForQuiz(quizId) {
    return model.deleteMany({ quiz: quizId });
  }

  return {
    findAttemptsForStudent,
    findAttemptById,
    createAttempt,
    deleteAttemptsForQuiz,
  };
}
