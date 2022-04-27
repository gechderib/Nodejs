const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controllers");
module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/auth/signup",
    [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRoleExisted],
    controller.signUp
  );

  app.post("api/auth/signin", controller.signin);
};
