const Model = require("../models/model");
const model = require("../models/model");

async function postContoller(req, res){
  const data = new Model({
    name: req.body.name,
    age: req.body.age})

    try {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave);
    } catch {
      res.status(400).json({ message: error.message });
    }
}

module.exports = { postContoller }