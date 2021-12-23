const connection = require("../DB/configration");
const taskModule = require("../model/taskModel");
const multer = require("multer");
const allTasks = async (req, res) => { 
 try{
     await req.user.populate('tasks')  

    res.status(200).send(req.user.tasks)
    
 }catch(err){
  res.status(500).send(err)
}
};

const addTask = async (req, res) => {
  try{
    const task = new taskModule({...req.body,owner:req.user._id})
    await task.save();
    res.status(200).send(task);
  }catch(err){
    res.status(400).send(err.message)
  }
}
const getById = async (req, res) => {
  try {
    const _id = req.params.taskId;
    const task = await taskModule.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send("Not founeded");
    }
    res.status(200).send(task);
  } catch (err){
    res.status(400).json({ message: "error", err: err.message });
  }
};
const updateTask = async (req, res) => {
  const allow = ["description", "complete"];
  const fields = Object.keys(req.body);
  const valid = fields.every((field) => allow.includes(field));
  if (valid) {
    try {
      const _id = req.params.taskId;
      const task = await taskModule.findOne({_id,owner: req.user._id} );

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
  taskModule
    .findOneAndDelete({_id:req.params.taskID,owner: req.user._id})
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

const uploud= multer({
  limits :{
    fileSize:1000000
  },
  fileFilter(req,file,cb){
    if(!file.originalname.match(/\.(jpg|jpeg|png|gfif)$/ )){
       cb(new Error('only image files are allowed'))
    }
    cb(null,true);
  }
})

const upImg= async(req, res)=>{
 try{
  const _id = req.params.taskId;
  const task = await taskModule.findOne({ _id, owner: req.user._id });
  if (!task) {
    return res.status(404).send("Not founeded");
  }
  task.img =req.file.buffer
  await task.save()
  res.status(200).send('task image uplouded ')
  }catch (err) {
    res.status(400).send(err)
  }
}

module.exports = { allTasks, addTask, getById, updateTask, deleteTask ,uploud, upImg};
