
const router = require("express").Router();
const taskController = require("../controllers/taskControllers")
const auth = require("../middelware/auth")
router.get("/all/task",auth, taskController.allTasks);

router.post("/add/task",auth,taskController.addTask);

router.get("/get/task/:taskId", auth,taskController.getById);

router.patch("/edit/task/:taskId", auth, taskController.updateTask);
router.post('/task/img_up/:taskId',auth,taskController.uploud.single('avatar'),taskController.upImg)
router.delete('/delete/task/:taskID', auth, taskController.deleteTask);
module.exports = router;
