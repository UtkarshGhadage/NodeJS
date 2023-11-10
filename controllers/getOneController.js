const Model = require("../models/model");
const model = require("../models/model");


async function getOneController(req, res){
    try {
      const data = await Model.findById(req.params.id);
      res.json(data);
    } catch {
      res.status(500).json({ message: error.message });
    }
}

module.exports = { getOneController };