
const router = require("express").Router();
const auth = require("../middelware/auth")
 
const userController =require("../controllers/userController")

router.get("/alluser",auth, userController.allUsers);

router.post("/addUser", userController.addUser);
router.post('/login', userController.login);

router.get("/get/:userId",auth, userController.getById);
router.get('/profile',auth,(req, res) =>{
    res.send(req.user)
}
)
router.patch("/editUser/:userId",auth,userController.updateUser);

router.delete("/logout",auth,userController.logout);
router.delete("/logoutAll",auth,userController.logoutAll);
router.delete('/deleteUser/:userID',auth,userController.deleteUser);
module.exports = router;
