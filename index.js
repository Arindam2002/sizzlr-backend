// IMPORTS FROM PACKAGES
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

// IMPORT FROM FILES
const authRouter = require("./routes/auth");
const canteenRouter = require("./routes/canteen");
const ordersRouter = require("./routes/orders");
const updateRouter = require("./routes/updateDetails");
const categoryRouter = require("./routes/category");

// INITIALIZATION
const PORT = process.env.PORT || 8080;
const app = express();
// const DB = "mongodb+srv://sizzlr:Alohmora%4020@sizzlr-cluster-0.i1w2lfj.mongodb.net/?retryWrites=true&w=majority"

// MIDDLEWARE
app.use(express.json());
app.use(canteenRouter);
app.use(authRouter);
app.use(ordersRouter);
app.use(updateRouter);
app.use(categoryRouter);

// CONNECT TO MONGODB
mongoose.connect(process.env.DB).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(`ERROR CONNECTING TO MongoDB: ${err}`);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server up & running on port ${PORT}`);
});
