const connection = require("../DB/configration");
const userModel = require("../modules/userModule");

const allUsers = async (req, res) => {
  await userModel
    .find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};
const addUser = async (req, res) => {
  
  const user = new userModel(req.body);
  user
    .save()
    .then(() => {
      res.status(200).send(user);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};
const getById = async (req, res) => {
  await userModel
    .findById(req.params.userId)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).json({ message: "error" }));
};

const updateUser = async (req, res) => {
  const allow = ["email", "password"];
  const fields = Object.keys(req.body);
  const valid = fields.every((field) => allow.includes(field));

  if (valid) {
    try {
      const id = req.params.userId;
    
      const user = await userModel.findById(id);

      if (!user) {
        return res.status(400).send("No user founeded");
      }
      fields.forEach((element) => (user[element] = req.body[element]));
      //accessing object value by brackets cause I'm not sure that the key is exist
      await user.save();
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    const notAllowed = fields.filter((field) => !allow.includes(field));
    res.status(400).send(`you can't ediet ${notAllowed} field`);
  }
};

const deleteUser = (req, res) => {
  userModel
    .findByIdAndDelete(req.params.userID)
    .then((data) => {
      if (data) {
        res.send(`user with id: ${req.params.userID} has been deleted`);
      } else {
        res.status(400).send(`user id: ${req.params._id} Not Found`);
      }
    })
    .catch((e) => {
      res.status(500).send(e);
    });
};

module.exports = { allUsers, addUser, getById, updateUser, deleteUser };
