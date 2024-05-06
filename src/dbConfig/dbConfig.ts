import mongoose from "mongoose";
export async function connect() {
  try {
   await  mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoBD connected Successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection err , Please make user MongoDB is running" + err
      );
    });
  } catch (err) {
    console.log("Something Went Wrong");
    console.log(err);
  }
}
