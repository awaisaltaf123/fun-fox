const express = require("express");
const app = express();
const cors = require("cors");
const userGroup = require("./api/userGroup");
const userTask = require("./api/userTask");

app.use(express.json({ extended: false }));

// Configure CORS
const corsOptions = {
  origin: ["*"],
};

app.use(cors(corsOptions));

app.use("/api/userTasks", userTask);
app.use("/api/userGroups", userGroup);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
