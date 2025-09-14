import mongoose from "mongoose";

let isConnected: boolean = false; // track connection status

export const dbConnection = async () => {
  if (isConnected) {
    console.log("Already connected to DB");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!);
    isConnected = db.connections[0].readyState === 1;

    if (isConnected) {
      console.log("Connection to DB successful");
    }
  } catch (error) {
    console.error("Error connecting to DB:", error);
    process.exit(1);
  }
};

