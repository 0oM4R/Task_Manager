
const router = require("express").Router();
const auth = require("../middelware/auth")
 
const userController =require("../controllers/userController")

router.get("/alluser",auth, userController.allUsers);

router.post("/addUser", userController.addUser);
router.post('/login', userController.login);

router.get("/get/:userId", userController.getById);

router.patch("/editUser/:userId",userController.updateUser);

router.delete('/deleteUser/:userID',userController.deleteUser);
module.exports = router;
