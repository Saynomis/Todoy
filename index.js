import express from "express";
import bodypParser from "body-parser";

const app = express();
const port = 3000;
var tasks = [];
var workTasks = [];

app.use(express.static("public"));
app.use(bodypParser.urlencoded({ extended: true }));

//Delete items functions 
function deleteAllTasks(tasks) {
    tasks.splice(0, tasks.length);
}

function deleteWorkTasks(workTasks) {
    workTasks.splice(0, workTasks.length);
}

//Render page functions
function renderWorkPage(req, res, workTasks) {
    var workTasksLength = workTasks.length;
    var newWorkTasks = workTasks;
    res.render("work.ejs", { lengthOfWorkTasks: workTasksLength, newWorkTsk: newWorkTasks });
}

function renderIndexPage(req, res, tasks) {
    var tasksLength = tasks.length;
    var newTasks = tasks;
    res.render("index.ejs", { lengthOfTasks: tasksLength, newTsk: newTasks });
}

//Post request for deleting tasks and redirecting to blank page 
app.post("/delete", (req, res) => {
    deleteWorkTasks(tasks);
    res.redirect("/"); 
  });

  app.post("/deleteWork", (req, res) => {
    deleteWorkTasks(workTasks);
    res.redirect("/work"); 
  });

//Render pages and view page with functionality
app.get("/", (req, res) => {
    renderIndexPage(req, res, tasks);
});

app.post("/", (req, res) => {
    var input = req.body["newItem"];
    tasks.push(input);
    renderIndexPage(req, res, tasks);
});

app.get("/work", (req, res) => {
    renderWorkPage(req, res, workTasks);
});

app.post("/work", (req, res) => {
    var input = req.body["newWorkItem"];
    workTasks.push(input);
    renderWorkPage(req, res, workTasks);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});