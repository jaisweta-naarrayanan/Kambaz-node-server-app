import "dotenv/config";
import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import session from 'express-session';
import Hello from './Hello.js';
import Lab5 from './Labs/Lab5/index.js';
import db from './Kambaz/Database/index.js';
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.js";
import QuizzesRoutes from "./Kambaz/Quizzes/routes.js";
import QuestionsRoutes from "./Kambaz/Questions/routes.js";
import QuizAttemptsRoutes from "./Kambaz/QuizAttempts/routes.js";
import QuestionGroupsRoutes from "./Kambaz/QuestionGroups/routes.js";

//const express = require('express')
const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);
const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};

if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}

app.use(session(sessionOptions));
app.use(express.json());

// register routes after middleware
UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentsRoutes(app, db);
EnrollmentsRoutes(app, db);
QuizzesRoutes(app, db);
QuestionsRoutes(app, db);
QuizAttemptsRoutes(app, db);
QuestionGroupsRoutes(app, db);
Hello(app);
Lab5(app);

app.listen(process.env.PORT || 4000);