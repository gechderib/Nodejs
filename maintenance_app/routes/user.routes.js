const controller = require("../controllers/user.controllers")
const {authJwt,verifySignUp} = require("../middleware/index")

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/test/all",controller.allAccess)
  app.get("/api/test/user", authJwt.verifyToken, controller.userBoard)
  app.get("/api/test/admin",[
      authJwt.verifyToken,authJwt.isAdmin
  ],controller.adminboard)

  app.get("/api/test/mod",[
      authJwt.verifyToken, authJwt.isModerator
  ],controller.moderatorBoard)
  
};
