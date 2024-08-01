const { webcrypto } = require("crypto");
const express = require("express");
const app = express();

const PORT = 3000;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));


app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});

app.get("/", (req, res) => {
    res.render("start.ejs");
});

let tasks = [
    {
        id: uuidv4(),
        task: "eat your dinner",
        timeLimit: "15min",
        priority: "high",
        category: "personal"
    },
    {
        id: uuidv4(),
        task: "finish homework",
        timeLimit: "1hr",
        priority: "medium",
        category: "school"
    },
    {
        id: uuidv4(),
        task: "work on project",
        timeLimit: "2hr",
        priority: "high",
        category: "work"
    },
    {
        id: uuidv4(),
        task: "exercise",
        timeLimit: "30min",
        priority: "low",
        category: "personal"
    },
    {
        id: "5e",
        task: "grocery shopping",
        timeLimit: "1hr",
        priority: "medium",
        category: "personal"
    }
];

app.get("/tasks", (req, res) => {
    res.render("index.ejs", { tasks });
});

app.get("/tasks/view/:id", (req, res) => {
    let { id } = req.params;
    let task = tasks.find((t) => id === t.id);
    res.render("task.ejs", { task });
});

app.delete("/tasks/:id", (req, res) => {
    let { id } = req.params;
    let task = tasks.find((t) => id === t.id);
    tasks = tasks.filter((t) => id !== t.id);
    res.redirect("/tasks");
});

app.get("/tasks/:id/edit", (req, res) => {
    let { id } = req.params;
    let task = tasks.find((t) => id === t.id);
    res.render("edit.ejs", { task });
});

app.put("/tasks/:id/edit", (req, res) => {
    let { id } = req.params;
    let task_ = tasks.find((t) => id === t.id);
    let newTask = req.body.task;
    let newTimeLimit = req.body.timeLimit;
    let newPriority = req.body.priority;
    let newCategory = req.body.category;
    task_.task = newTask;
    task_.timeLimit = newTimeLimit;
    task_.priority = newPriority;
    task_.category = newCategory;
    res.redirect("/tasks");
});

app.get("/tasks/new", (req, res) => {
    let { id } = req.params;
    let task = tasks.find((t) => id === t.id);
    res.render("createTask.ejs", { task });
});

app.post("/tasks/newTask", (req, res) => {
    let { id } = req.params;
    let task = tasks.find((t) => id === t.id);
    let newTask = {
        id: uuidv4(),
        task: req.body.task,
        timeLimit: req.body.timeLimit,
        priority: req.body.priority,
        category: req.body.category
    };
    tasks.push(newTask);
    res.redirect("/tasks");
    console.log("added user successfully!");
});