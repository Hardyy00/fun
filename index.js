const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/landing", express.static(path.join(__dirname, "public")));

let comments = [
  {
    id: "e1",
    user: "Hardik",
    comment: "Ok sure",
  },

  {
    id: "e2",
    user: "kaku",
    comment: "no thanks",
  },

  {
    id: "e3",
    user: "Kaneki",
    comment: "Life is painful",
  },
];

app.listen(8080, () => {
  console.log("connected");
});

app.get("/", (req, res) => {
  res.render("index", { comments });
});

app.post("/", (req, res) => {
  const { name, comment } = req.body;

  comments.push({ id: uuid(), user: name, comment: comment });

  res.redirect("/");
});

app.get("/data", (req, res) => {
  res.json(comments);
});

app.post("/landing", (req, res) => {
  const { name, comment } = req.body;

  comments.push({ id: uuid(), user: name, comment: comment });
});

app.patch("/:id", (req, res) => {
  const { name, comment } = req.body;
  const { id } = req.params;

  const foundUse = comments.find((user) => user.id == id);

  foundUse.user = name;
  foundUse.comment = comment;

  res.redirect("/");
});

app.get("/:id", (req, res) => {
  const { id } = req.params;

  const foundUser = comments.find((comment) => comment.id === id);

  console.log(foundUser);

  res.render("show", { foundUser });
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;

  const newArray = comments.filter((user) => user.id !== id);

  comments = newArray;

  res.redirect("/");
});

app.get("/comments/new", (req, res) => {
  res.render("new");
});

app.get("/:id/edit", (req, res) => {
  const { id } = req.params;

  const foundUser = comments.find((user) => user.id === id);
  res.render("edit", { foundUser });
});
