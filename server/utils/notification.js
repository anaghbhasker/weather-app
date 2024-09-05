import axios from "axios";
import userModal from "../model/userSchema.js";
import { sendNotification } from "../index.js";

export const sendingNotification = async () => {
    try {
        const users = await userModal.find({});
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;

        for (const user of users) {
            const currentLocation = user.locations.find((location) => location.type === "CURRENT");
            if (currentLocation) {
                const { lat, lon } = currentLocation;
                const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

                try {
                    const response = await axios.get(url);
                    const weatherData = await response.data;

                    if (weatherData && weatherData.weather) {
                        const weatherDescription = weatherData.weather[0].description;
                        const temperature = weatherData.main.temp;

                        const notificationMessage = `Weather update : ${weatherDescription}, ${temperature}°C.`;
                        sendNotification(notificationMessage, user.fcm_token);
                    } else {
                        console.log(`Failed to get weather data for ${user.username} at ${currentLocation.location_name}`);
                    }
                } catch (error) {
                    console.error(`Error fetching weather data for ${user.username}:`, error);
                }
            } else {
                console.log(`No current location found for user ${user.username}`);
            }
        }
    } catch (error) {
        console.log("✌️error --->", error);
    }
};
