import mongoose from "mongoose";

const URI =
  "mongodb+srv://adminDB:adminDB@cluster0.josyexb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const dataBaseConnection = async () => {
  try { 
    await mongoose.connect(URI);
    console.log("DATABASE IS CONNECTED");
  } catch(error) {
    console.log(error);
  }
};
