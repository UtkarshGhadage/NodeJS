const Model = require("../models/model");
const model = require("../models/model");

async function updateByIdController(req, res){
    try {
      const id = req.params.id;
      const updatedData = req.body;
      const options = { new: true };
  
      const result = await Model.findByIdAndUpdate(id, updatedData, options);
  
      res.send(result);
    } catch {
      res.status(400).json({ message: error.message });
    }
}

module.exports = { updateByIdController };