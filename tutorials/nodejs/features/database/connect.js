import mongoose from "mongoose";
const connectDB = async () => {
  try {
    mongoose
      .connect(process.env.DBURL)
      .then(() => {
        console.log(`connect successfully!`);
      })
      .catch(() => {
        console.log(`connect failed!`);
      });
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
