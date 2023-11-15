const Model = require("../models/model");

async function deleteByIdController(req, res) {
  try {
    const id = req.params.id;

    const data = await Model.findByIdAndDelete(id);

    res.send(`Document with ${data.name} has been deleted !!`);
  } catch {
    res.status(400).json({ message: "Something Went Wrong" });
  }
}

module.exports = { deleteByIdController };
