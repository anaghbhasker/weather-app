import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: { type: String },
        email: { type: String },
        password: { type: String },
        locations: [
            {
                location_name: { type: String, required: true },
                type: { type: String, required: true },
                lat: { type: Number, required: true },
                lon: { type: Number, required: true },
            },
        ],
        fcm_token: { type: String },
    },
    {
        timestamps: true,
    }
);

const userModal = mongoose.model("users", userSchema);
export default userModal;
