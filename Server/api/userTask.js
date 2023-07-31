const express = require("express");
const router = express.Router();
const mockTasks = require("../mockData/mockTaskData.json");

router.get("/", async (req, res) => {
  try {
    res.set("Access-Control-Allow-Origin", "*");
    res.json(mockTasks);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
