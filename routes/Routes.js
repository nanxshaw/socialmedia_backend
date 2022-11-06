


module.exports = app => {
  //controllers
  const auth = require("../controllers/AuthControllers");
  const content = require("../controllers/ContentControllers");
  const comment = require("../controllers/CommentControllers");

  //middleware
  const authJwt = require('../middleware/AuthJwt');
  const upload = require("../middleware/Upload");


  var router = require("express").Router();

  //Auth
  router.post("/login", auth.login);
  router.post("/loginsocial", auth.logsocial);
  router.post("/register", [upload.uploadFile.single('image')],auth.register);
  //------------------- AUTHORIZATION TOKEN JWT ------------------------------------------------------
  // Content
  router.get("/content", [authJwt.verifyToken], content.all);
  router.get("/content/:id", [authJwt.verifyToken], content.find_byId);
  router.post("/content", [authJwt.verifyToken,upload.uploadContentFile.array('image')], content.insert);
  router.put("/content", [authJwt.verifyToken], content.update);
  router.delete("/content/:id", [authJwt.verifyToken], content.delete);
  // Comment
  router.post("/comment", [authJwt.verifyToken], comment.insert);
  router.delete("/comment/:id", [authJwt.verifyToken], comment.delete);

  app.use('/api/', router);
};