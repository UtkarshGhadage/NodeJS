const express = require("express");
const router = express.Router();

const Model = require("../models/model");
const model = require("../models/model");

//Post
router.post("/post", async (req, res) => {
  const data = new Model({
    name: req.body.name,
    age: req.body.age,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch {
    res.status(400).json({ message: error.message });
  }
});

//Get
router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID
router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Model.findByIdAndDelete(id);

    res.send(`Document with ${data.name} has been deleted !!`);
  } catch {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
