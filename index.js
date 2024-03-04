const express = require("express");
const app = express();
const PORT = 8000;
const dotenv = require("dotenv");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const path = require('path');
const cors = require('cors');
const connectToMongoDB = require("./config/db.js")

dotenv.config();
const corsOptions = {
  origin: true,
};
app.use(cors(corsOptions));
const directory = __dirname;
app.use('/images', express.static(path.join(directory,'/public/images')));

// Middleware
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Backend Server is Running on ${PORT}`);
});
