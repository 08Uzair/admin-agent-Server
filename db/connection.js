import mongoose from "mongoose";

const URI =
  "mongodb+srv://avez3npqureshi:ecomm@cluster0.iqgv1yt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const dataBaseConnection = async () => {
  try {
    await mongoose.connect(URI);
    console.log("DATABASE IS CONNECTED");
  } catch (error) {
    console.log(error);
  }
};
