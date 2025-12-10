import QuestionsDao from "./dao.js";

export default function QuestionsRoutes(app, db) {
  const dao = QuestionsDao(db);

  // Get all questions for a quiz
  const findQuestionsForQuiz = async (req, res) => {
    const { qid } = req.params;
    const questions = await dao.findQuestionsForQuiz(qid);
    res.json(questions);
  };

  // Get a specific question by ID
  const findQuestionById = async (req, res) => {
    const { questionId } = req.params;
    const question = await dao.findQuestionById(questionId);
    res.json(question);
  };

  // Create a new question
  const createQuestion = async (req, res) => {
    const { qid } = req.params;
    const newQuestion = await dao.createQuestion(qid, req.body);
    res.json(newQuestion);
  };

  // Update a question
  const updateQuestion = async (req, res) => {
    const { questionId } = req.params;
    const status = await dao.updateQuestion(questionId, req.body);
    res.json(status);
  };

  // Delete a question
  const deleteQuestion = async (req, res) => {
    const { questionId } = req.params;
    const status = await dao.deleteQuestion(questionId);
    res.json(status);
  };

  // Get all questions for a course
  const findQuestionsForCourse = async (req, res) => {
    const { cid } = req.params;
    const questions = await dao.findQuestionsForCourse(cid);
    res.json(questions);
  };

  // Routes
  app.get("/api/courses/:cid/questions", findQuestionsForCourse);
  app.get("/api/quizzes/:qid/questions", findQuestionsForQuiz);
  app.get("/api/quizzes/:qid/questions/:questionId", findQuestionById);
  app.post("/api/quizzes/:qid/questions", createQuestion);
  app.put("/api/quizzes/:qid/questions/:questionId", updateQuestion);
  app.delete("/api/quizzes/:qid/questions/:questionId", deleteQuestion);
}
