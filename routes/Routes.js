


module.exports = app => {
  //controllers
  const auth = require("../controllers/AuthControllers");
  const user = require("../controllers/UserControllers");
  const education = require("../controllers/EducationControllers");
  const image = require('../controllers/ImageControllers');
  const work = require('../controllers/WorkControllers');
  const information = require('../controllers/UserInformationControllers');
  const interested = require('../controllers/InterestedControllers');
  const lifestyle = require('../controllers/LifestyleControllers');
  const verification = require('../controllers/VerificationControllers');

  //middleware
  const authJwt = require('../middleware/AuthJwt');
  const upload = require("../middleware/Upload");


  var router = require("express").Router();

  //Auth
  router.post("/login", auth.login);
  router.post("/register", auth.register);
  router.post("/forgotpassword", auth.forgot_password);

  //Data User
  router.get("/user", [authJwt.verifyToken], user.all_user);
  //Image User
  router.get("/user/image", [authJwt.verifyToken], image.all);
  router.get("/user/image/:id", [authJwt.verifyToken], image.find_byId);
  router.post("/user/image", [authJwt.verifyToken, upload.uploadFile.array('image')], image.insert);
  router.put("/user/image", [authJwt.verifyToken, upload.uploadFile.array('image')], image.update);
  router.delete("/user/image/:id", [authJwt.verifyToken], image.delete);
  //education
  router.get("/user/education", [authJwt.verifyToken], education.all);
  router.get("/user/education/:id", [authJwt.verifyToken], education.find_byId);
  router.post("/user/education", [authJwt.verifyToken], education.insert);
  router.put("/user/education", [authJwt.verifyToken], education.update);
  router.delete("/user/education/:id", [authJwt.verifyToken], education.delete);
  //work
  router.get("/user/work", [authJwt.verifyToken], work.all);
  router.get("/user/work/:id", [authJwt.verifyToken], work.find_byId);
  router.post("/user/work", [authJwt.verifyToken], work.insert);
  router.put("/user/work", [authJwt.verifyToken], work.update);
  router.delete("/user/work/:id", [authJwt.verifyToken], work.delete);
  //user information
  router.get("/user/information", [authJwt.verifyToken], information.all);
  router.get("/user/information/:id", [authJwt.verifyToken], information.find_byId);
  router.post("/user/information", [authJwt.verifyToken], information.insert);
  router.put("/user/information", [authJwt.verifyToken], information.update);
  router.delete("/user/information/:id", [authJwt.verifyToken], information.delete);
  //interested
  router.get("/user/interested", [authJwt.verifyToken], interested.all);
  router.get("/user/interested/:id", [authJwt.verifyToken], interested.find_byId);
  router.post("/user/interested", [authJwt.verifyToken], interested.insert);
  router.put("/user/interested", [authJwt.verifyToken], interested.update);
  router.delete("/user/interested/:id", [authJwt.verifyToken], interested.delete);
  //lifestyle
  router.get("/user/lifestyle", [authJwt.verifyToken], lifestyle.all);
  router.get("/user/lifestyle/:id", [authJwt.verifyToken], lifestyle.find_byId);
  router.post("/user/lifestyle", [authJwt.verifyToken], lifestyle.insert);
  router.put("/user/lifestyle", [authJwt.verifyToken], lifestyle.update);
  router.delete("/user/lifestyle/:id", [authJwt.verifyToken], lifestyle.delete);
  //verification
  router.get("/user/verification", [authJwt.verifyToken], verification.all);
  router.get("/user/verification/:id", [authJwt.verifyToken], verification.find_byId);
  router.post("/user/verification", [authJwt.verifyToken], verification.insert);
  router.put("/user/verification", [authJwt.verifyToken], verification.update);
  router.delete("/user/verification/:id", [authJwt.verifyToken], verification.delete);
  
  app.use('/api/', router);
};