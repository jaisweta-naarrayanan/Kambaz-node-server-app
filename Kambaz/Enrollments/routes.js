import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  app.post("/api/enrollments", async (req, res) => {
    const { userId, courseId } = req.body;
    const enrollment = await dao.enrollUserInCourse(userId, courseId);
    res.json(enrollment);
  });

  app.delete("/api/enrollments", async (req, res) => {
    const { userId, courseId } = req.body;
    await dao.unenrollUserFromCourse(userId, courseId);
    res.sendStatus(200);
  });

  app.get("/api/enrollments/user/:userId", async (req, res) => {
    const { userId } = req.params;
    const courses = await dao.findCoursesForUser(userId);
    res.json(courses);
  });

  app.get("/api/enrollments/course/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const users = await dao.findUsersForCourse(courseId);
    res.json(users);
  });
}

