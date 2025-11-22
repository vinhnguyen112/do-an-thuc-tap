const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Import routes
const testRoute = require("./routes/test");

// Sử dụng route
app.use("/api/test", testRoute);

app.listen(3000, () => {
  console.log("Backend chạy tại http://localhost:3000");
});
app.get("/", (req, res) => {
  res.send("Backend API hoạt động!");
});
