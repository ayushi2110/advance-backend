import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    let connectInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log("Connection Successfully", connectInstance.connection.host);
  } catch (error) {
    console.log("Mongodb Connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
