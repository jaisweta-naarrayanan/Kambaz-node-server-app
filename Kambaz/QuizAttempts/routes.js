import QuizAttemptsDao from "./dao.js";

export default function QuizAttemptsRoutes(app, db) {
  const dao = QuizAttemptsDao(db);

  // Get all attempts for a student on a specific quiz
  const findAttemptsForStudent = async (req, res) => {
    const { qid } = req.params;
    const currentUser = req.session["currentUser"];

    if (!currentUser) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const attempts = await dao.findAttemptsForStudent(qid, currentUser._id);
    res.json(attempts);
  };

  // Get a specific attempt by ID
  const findAttemptById = async (req, res) => {
    const { attemptId } = req.params;
    const attempt = await dao.findAttemptById(attemptId);
    res.json(attempt);
  };

  // Create a new attempt (student submits quiz)
  const createAttempt = async (req, res) => {
    const currentUser = req.session["currentUser"];

    if (!currentUser) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const attempt = {
      ...req.body,
      student: currentUser._id,
    };
    const newAttempt = await dao.createAttempt(attempt);
    res.json(newAttempt);
  };

  // Routes
  app.get("/api/quizzes/:qid/attempts", findAttemptsForStudent);
  app.get("/api/quizzes/:qid/attempts/:attemptId", findAttemptById);
  app.post("/api/quizzes/:qid/attempts", createAttempt);
}
