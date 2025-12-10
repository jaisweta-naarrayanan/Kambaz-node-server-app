import QuestionGroupsDao from "./dao.js";

export default function QuestionGroupsRoutes(app, db) {
  const dao = QuestionGroupsDao(db);

  const findGroupsForQuiz = async (req, res) => {
    const { qid } = req.params;
    const groups = await dao.findGroupsForQuiz(qid);
    res.json(groups);
  };

  const createGroup = async (req, res) => {
    const { qid } = req.params;
    const newGroup = await dao.createGroup(qid, req.body);
    res.json(newGroup);
  };

  const updateGroup = async (req, res) => {
    const { groupId } = req.params;
    const status = await dao.updateGroup(groupId, req.body);
    res.json(status);
  };

  const deleteGroup = async (req, res) => {
    const { groupId } = req.params;
    const status = await dao.deleteGroup(groupId);
    res.json(status);
  };

  app.get("/api/quizzes/:qid/groups", findGroupsForQuiz);
  app.post("/api/quizzes/:qid/groups", createGroup);
  app.put("/api/quizzes/:qid/groups/:groupId", updateGroup);
  app.delete("/api/quizzes/:qid/groups/:groupId", deleteGroup);
}
