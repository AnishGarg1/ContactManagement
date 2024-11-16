const express = require("express");
const { createTask, deleteTask, getAllTaskDetails, getTaskDetails, updateTask } = require("../controllers/Task");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.post("/createTask", auth, createTask);
router.post("/getTask", auth, getTaskDetails);
router.put("/updateTask", auth, updateTask);
router.get("/getAllTasks", auth, getAllTaskDetails);
router.delete("/deleteTask", auth, deleteTask);

module.exports = router;