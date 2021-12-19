
const router = require("express").Router();
const taskController = require("../controllers/taskControllers")
const userController =require("../controllers/userController")

router.get("/allTask", taskController.allTasks);

router.post("/add", taskController.addTask);

router.get("/get:taskId", taskController.getById);

router.patch("/edit/:taskId",taskController.updateTask);

router.delete('/delete/:taskID',taskController.deleteTask);
module.exports = router;
