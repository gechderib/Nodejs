const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api", (req, res) => {
  res.json({ message: "hello every one welcome" });
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
        console.log('this one')
      res.sendStatus(403);
    } else {
      res.json({
        message: "post created",
        authData,
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    username: "alemu",
    email: "g@gmail.com",
    password: 1221,
  };

  jwt.sign({ user: user }, "secretkey", (err, token) => {
    res.json({ token });
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
      
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {

    res.sendStatus(403); //forbidden
  }
}

app.listen(5000, () => {
  console.log("the app is running at port: 5000");
});
