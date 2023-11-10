const express = require("express");
const router = express.Router();

const Model = require("../models/model");
const model = require("../models/model");

const { postContoller } = require("../controllers/postController");
const { getAllController } = require("../controllers/getAllController");
const { getOneController } = require("../controllers/getOneController");
const { updateByIdController } = require("../controllers/updateByIdController");
const { deleteByIdCOntroller } = require("../controllers/deleteByIdController");

//Post
router.post("/post", postContoller);

//Get
router.get("/getAll", getAllController);

//Get by ID
router.get("/getOne/:id", getOneController);

//Update by ID Method
router.patch("/update/:id", updateByIdController);

//Delete by ID Method
router.delete("/delete/:id", deleteByIdCOntroller);

module.exports = router;
