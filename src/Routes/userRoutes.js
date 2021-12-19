
const router = require("express").Router();

const userController =require("../controllers/userController")

router.get("/alluser", userController.allUsers);

router.post("/addUser", userController.addUser);

router.get("/get/:userId", userController.getById);

router.patch("/editUser/:userId",userController.updateUser);

router.delete('/deleteUser/:userID',userController.deleteUser);
module.exports = router;
