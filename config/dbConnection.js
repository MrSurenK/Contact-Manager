// import mongoose
const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    // establish connection
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    // log connection in terminal for us to be aware
    console.log(
      "Database connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
