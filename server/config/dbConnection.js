const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(
      process.env.CONNNECTION_STRING ||
        "mongodb+srv://haseeb99sh:saadjaan@cluster0.gx1b9rv.mongodb.net/auth?retryWrites=true&w=majority"
    );
    console.log("Database connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = connectDb; 
