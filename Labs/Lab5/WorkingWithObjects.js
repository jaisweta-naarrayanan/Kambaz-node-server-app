const assignment = {
  id: 1, title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10", completed: false, score: 0,
};
const getAssignmentTitle = (req, res) => {
    res.json(assignment.title);
  };
const setAssignmentTitle = (req, res) => {
   const { newTitle } = req.params;
   assignment.title = newTitle;
   res.json(assignment);
 }; 

const setAssignmentScore = (req, res) => {
    const { newScore } = req.params;
    assignment.score = parseFloat(newScore);
    res.json(assignment);
  };
const setAssignmentCompleted = (req, res) => {
    const { newCompleted } = req.params;
    assignment.completed = (newCompleted.toLowerCase() === 'true');
    res.json(assignment);
  };  
 
  // Module object with string properties: id, name, description, course
const moduleObj = {
  id: "M01",
  name: "Introduction to Node.js",
  description: "Basics of Node.js, Express, and building REST APIs",
  course: "CS-5610 Web Development"
};
const getModule = (req, res) => {
    res.json(moduleObj);
  };
const getModuleName = (req, res) => {
    res.json(moduleObj.name);
  };
const setModuleName = (req, res) => {
    const { newName } = req.params;
    moduleObj.name = newName;
    res.json(moduleObj);
  };
const setModuleDescription = (req, res) => {
    const { newDescription } = req.params;
    moduleObj.description = newDescription;
    res.json(moduleObj);
  }

export default function WorkingWithObjects(app) {

  
  const getAssignment = (req, res) => {
    res.json(assignment);
  };

  app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle)
  app.get("/lab5/assignment/score/:newScore", setAssignmentScore)
  app.get("/lab5/assignment/completed/:newCompleted", setAssignmentCompleted)

  app.get("/lab5/assignment", getAssignment);
  app.get("/lab5/assignment/title", getAssignmentTitle);
  app.get("/lab5/module", getModule);
  app.get("/lab5/module/name", getModuleName);
  app.get("/lab5/module/name/:newName", setModuleName);
  app.get("/lab5/module/description/:newDescription", setModuleDescription);
};

