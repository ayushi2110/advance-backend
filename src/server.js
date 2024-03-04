import dotenv from "dotenv";
import dbConnection from "./db/databaseConnection.js";
import { APP_PORT } from "./constants.js";
import { app } from "./app.js";

const PORT = process.env.PORT || APP_PORT;

dotenv.config({
  path: "/.env",
});

//Database Connection
dbConnection()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error", error);
      throw error;
    });
    app.listen(PORT, () => {
      console.log(`server is running`, PORT);
    });
  })
  .catch((err) => {
    console.log("Mongodb Connection Failed", err);
  });
