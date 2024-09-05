import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/mongoDb.js";
import { ApolloServer } from "apollo-server-express";
import resolvers from "./resolvers/index.js";
import typeDefs from "./typeDefs/index.js";
import admin from "firebase-admin";
import serviceAccount from "./config/weather-app-8070e-firebase-adminsdk-t6psy-adfa64f626.json" assert { type: "json" };
import { sendingNotification } from "./utils/notification.js";
import cron from "node-cron";

dotenv.config();

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser({}));
const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: ({ req }) => {
        return { req };
    },
});

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
export const sendNotification = (notificationMessage, FCMToken) => {
    try {
        const registrationToken = FCMToken;
        if (!registrationToken) {
            return console.log("Registration token is missing");
        }

        const message = {
            notification: {
                title: "Daily Weather Forecast",
                body: notificationMessage,
            },
            token: registrationToken,
        };

        admin
            .messaging()
            .send(message)
            .then((response) => {
                // console.log("Successfully sent message:", response);
            })
            .catch((error) => {
                console.error("Error sending message:", error);
            });
    } catch (error) {
        console.log("✌️error --->", error);
    }
};

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

server.start().then(async (res) => {
    await connectDb(DATABASE_URL);
    // Schedule the sendingNotification function to run daily at 12:00 AM
    cron.schedule("0 0 * * *", async () => {
        console.log("Starting daily notifications...");
        await sendingNotification();
        console.log("Daily notifications completed.");
    });
    server.applyMiddleware({ app });
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
});
