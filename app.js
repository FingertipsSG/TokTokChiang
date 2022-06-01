const express = require('express');
const path = require("path");
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));
app.use(express.static("public"));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || '3000';
app.listen(port, () => console.log(`Server started on Port ${port}`));