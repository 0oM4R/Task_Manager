const connection = require("../DB/configration");
const taskModel = require("../modules/taskModule");

const allTasks = async (req, res) => {
  await taskModel
    .find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};
const addTask = async (req, res) => {
  // const { title, description,password, complete } = req.body;
  // await taskModel
  //   .insertMany({ title, description,password,complete })
  //   .then(() => {
  //     res.status(200).send(`task with title ${title} added`);
  //   })
  //   .catch((err) => res.status(400).json({ message: "error", err }));
  const task = new taskModel(req.body);
  task
    .save()
    .then(() => {
      res.status(200).send(task);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};
const getById = async (req, res) => {
  await taskModel
    .findById(req.params.taskId)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).json({ message: "error" }));
};

const updateTask = async (req, res) => {
  const allow = ["description", "complete"];
  const fields = Object.keys(req.body);
  const valid = fields.every((field) => allow.includes(field));

  if (valid) {
    try {
      const id = req.params.taskId;
    
      const task = await taskModel.findById(id);

      if (!task) {
        return res.status(400).send("No task founeded");
      }
      fields.forEach((element) => (task[element] = req.body[element]));
      //accessing object value by brackets cause I'm not sure that the key is exist
      await task.save();
      res.status(200).send(task);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    const notAllowed = fields.filter((field) => !allow.includes(field));
    res.status(400).send(`you can't ediet ${notAllowed} field`);
  }
};

const deleteTask = (req, res) => {
  taskModel
    .findByIdAndDelete(req.params.taskID)
    .then((data) => {
      if (data) {
        res.send(`task with id: ${req.params.taskID} has been deleted`);
      } else {
        res.status(400).send(`task id: ${req.params._id} Not Found`);
      }
    })
    .catch((e) => {
      res.status(500).send(e);
    });
};

module.exports = { allTasks, addTask, getById, updateTask, deleteTask };
