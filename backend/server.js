
const express = require("express");
const cors = require("cors");

const app = express();


const authRoutes = require("./routes/authRoutes");

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.use("/api/work-orders", require("./routes/workOrderRoutes"));

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server Running On Port", PORT);
});