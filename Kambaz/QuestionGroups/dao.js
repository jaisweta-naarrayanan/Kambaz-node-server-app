import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function QuestionGroupsDao(db) {
  async function findGroupsForQuiz(quizId) {
    return model.find({ quiz: quizId });
  }

  async function findGroupById(groupId) {
    return model.findById(groupId);
  }

  async function createGroup(quizId, group) {
    const newGroup = { ...group, _id: uuidv4(), quiz: quizId };
    return model.create(newGroup);
  }

  async function updateGroup(groupId, groupUpdates) {
    return model.updateOne({ _id: groupId }, { $set: groupUpdates });
  }

  async function deleteGroup(groupId) {
    return model.deleteOne({ _id: groupId });
  }

  return {
    findGroupsForQuiz,
    findGroupById,
    createGroup,
    updateGroup,
    deleteGroup,
  };
}
