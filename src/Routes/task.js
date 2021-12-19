
const router = require("express").Router();
const controller = require("../controllers/task_controllers")

router.get("/allTask", controller.allTasks);

router.post("/add", controller.addTask);

router.get("/get:taskId", controller.getById);

router.patch("/edit/:taskId",controller.updateTask);

router.delete('/delete/:taskID',controller.deleteTask);
module.exports = router;
