/* 
// ye wala code pehle tha mne change kr diya


import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log('Failed to connect', error);
    }
}
export default connectDB;
*/
import mongoose from "mongoose";

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        console.error("MONGO_URI is not defined in environment variables.");
        process.exit(1); // Exit process with failure
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
        process.exit(1); // Exit process with failure
    }
};

// Graceful shutdown
process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
    process.exit(0);
});

export default connectDB;
