const Model = require("../models/model");

async function getAllController(req, res){
    try {
      const data = await Model.find();
      res.json(data);
    } catch {
      res.status(500).json({ message: "Something Went Wrong" });
    }
}


module.exports = {getAllController};