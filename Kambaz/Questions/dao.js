import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function QuestionsDao(db) {
  async function findQuestionsForQuiz(quizId) {
    return model.find({ quiz: quizId });
  }

  async function findQuestionById(questionId) {
    return model.findById(questionId);
  }

  async function createQuestion(quizId, question) {
    const newQuestion = { ...question, _id: uuidv4(), quiz: quizId };
    return model.create(newQuestion);
  }

  async function updateQuestion(questionId, questionUpdates) {
    return model.updateOne({ _id: questionId }, { $set: questionUpdates });
  }

  async function deleteQuestion(questionId) {
    return model.deleteOne({ _id: questionId });
  }

  async function deleteQuestionsForQuiz(quizId) {
    return model.deleteMany({ quiz: quizId });
  }

  return {
    findQuestionsForQuiz,
    findQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    deleteQuestionsForQuiz,
  };
}
