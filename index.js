// load all environment vars to process.env.___
require("dotenv").config();

// dependencies
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error"); // relative path

// routes
const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");

// middlewares
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const db = require("./models");

const PORT = 8081;

app.use(cors());

// body parser
app.use(bodyParser.json());
// Enables express to parse body data from x-www-form-encoded data
app.use(bodyParser.urlencoded({ extended: false }));

// all routes
app.use("/api/auth", authRoutes);
app.use(
  "/api/users/:id/messages",
  loginRequired,
  ensureCorrectUser,
  messagesRoutes
);
app.get("/api/messages/", loginRequired, async function (req, res, next) {
  try {
    let messages = await db.Message.find()
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        profileImageUrl: true,
      });

    return res.status(200).json(messages);
  } catch (error) {
    return next(error);
  }
});

// middleware
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function () {
  console.log(`Server started on PORT ${PORT}`);
});

/*
Sign Up

http POST localhost:8081/api/auth/signup username=newUser password=newnew email=new@mail.com

Sign In

http POST localhost:8081/api/auth/signin email=new@mail.com password=newnew

{
    "id": "5f62f01b70c1a562c34063a2",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNjJmMDFiNzBjMWE1NjJjMzQwNjNhMiIsInVzZXJuYW1lIjoibmV3dXNlciIsImlhdCI6MTYwMDMzMzQ4N30.-nyOS6X8Mlb_EvLvcWnK5gDNMzbGzrTHYD4DadPU47c",
    "username": "newuser"
}

create

http POST localhost:8081/api/users/5f62f01b70c1a562c34063a2/messages "Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNjJmMDFiNzBjMWE1NjJjMzQwNjNhMiIsInVzZXJuYW1lIjoibmV3dXNlciIsImlhdCI6MTYwMjIxOTQzOH0.R4POOct3cBsFgleJ4IbK_oVKXYZvOkEJzail_GVQZIA" text="Hello world"


Sign up as hacker

http POST localhost:8081/api/auth/signup username=hacker password=hacker email=hack@mail.com

Send unauthorized message : using login id of someone else but token is hacker's

http POST localhost:8081/api/users/5f62f01b70c1a562c34063a2/messages "Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmN2ZlMmYyN2Y5NDYyM2FjZjdhMGUwOCIsInVzZXJuYW1lIjoiaGFja2VyIiwiaWF0IjoxNjAyMjE2NjkwfQ.tGD4WjXRXf37qvsxqdQ_eD0Om27uJbNMsr8PlhmVp44" text="sending unauthorised message"


Get message

http POST localhost:8081/api/users/5f62f01b70c1a562c34063a2/

*/
