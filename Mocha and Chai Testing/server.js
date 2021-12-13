const express = require("express");
const morgan = require("morgan");
//const cors = require("cors");

// Express app
const app = express();

// constants
const PORT = 8080;

// application level middleware
// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   })
// );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// logger
// app.use(morgan("dev"));

// route initialize
app.use("/api", require("./routes/api"));

// server startup logic
const server = app.listen(PORT, () => {
  console.log(`Server started | Link: http://localhost:${PORT}/`);
});

module.exports = server;
