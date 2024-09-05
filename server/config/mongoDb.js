import mongoose from "mongoose";

export const connectDb = async (DATABASE_URL) => {
    mongoose.set("strictQuery", false);
    try {
        const DB_OPTION = { dbName: "squadra" };
        await mongoose.connect(DATABASE_URL, DB_OPTION);
        console.log("Database connected");
    } catch (error) {
        console.log("✌️error --->", error);
    }
};
