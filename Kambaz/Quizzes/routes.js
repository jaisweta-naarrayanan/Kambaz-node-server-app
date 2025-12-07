import QuizzesDao from "./dao.js";
import QuestionsDao from "../Questions/dao.js";
import QuizAttemptsDao from "../QuizAttempts/dao.js";

export default function QuizzesRoutes(app, db) {
  const quizzesDao = QuizzesDao(db);
  const questionsDao = QuestionsDao(db);
  const attemptsDao = QuizAttemptsDao(db);

  // Get all quizzes for a course
  const findQuizzesForCourse = async (req, res) => {
    const { cid } = req.params;
    const quizzes = await quizzesDao.findQuizzesForCourse(cid);
    res.json(quizzes);
  };

  // Get a specific quiz by ID
  const findQuizById = async (req, res) => {
    const { qid } = req.params;
    const quiz = await quizzesDao.findQuizById(qid);
    res.json(quiz);
  };

  // Create a new quiz
  const createQuiz = async (req, res) => {
    const { cid } = req.params;
    const newQuiz = await quizzesDao.createQuiz(cid, req.body);
    res.json(newQuiz);
  };

  // Update a quiz
  const updateQuiz = async (req, res) => {
    const { qid } = req.params;
    const status = await quizzesDao.updateQuiz(qid, req.body);
    res.json(status);
  };

  // Delete a quiz (and associated questions and attempts)
  const deleteQuiz = async (req, res) => {
    const { qid } = req.params;
    // Delete associated questions and attempts first
    await questionsDao.deleteQuestionsForQuiz(qid);
    await attemptsDao.deleteAttemptsForQuiz(qid);
    const status = await quizzesDao.deleteQuiz(qid);
    res.json(status);
  };

  // Publish/Unpublish a quiz
  const publishQuiz = async (req, res) => {
    const { qid } = req.params;
    const { published } = req.body;
    const status = await quizzesDao.publishQuiz(qid, published);
    res.json(status);
  };

  // Routes
  app.get("/api/courses/:cid/quizzes", findQuizzesForCourse);
  app.get("/api/courses/:cid/quizzes/:qid", findQuizById);
  app.post("/api/courses/:cid/quizzes", createQuiz);
  app.put("/api/courses/:cid/quizzes/:qid", updateQuiz);
  app.delete("/api/courses/:cid/quizzes/:qid", deleteQuiz);
  app.put("/api/courses/:cid/quizzes/:qid/publish", publishQuiz);
}
