import userModal from "../model/userSchema.js";

export const userSignup = async (parent, args, context, info) => {
    try {
        const { username, email, password, locations } = args.input;
        const userExist = await userModal.findOne({ email });
        if (userExist) {
            return {
                success: false,
                message: "User already exists with this email",
                user: null,
            };
        }
        const newUser = await userModal.create({ username, email, password, locations });
        return {
            success: true,
            message: "User created successfully",
            user: newUser,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
            user: null,
        };
    }
};

export const userLogin = async (parent, args, context, info) => {
    try {
        const { email, password, fcm_token } = args.input;
        const user = await userModal.findOne({ email });

        if (!user) {
            return {
                success: false,
                message: "User with this email does not exist",
                user: null,
            };
        }

        const isPasswordCorrect = user.password == password;

        if (!isPasswordCorrect) {
            return {
                success: false,
                message: "Incorrect password",
                user: null,
            };
        }

        await userModal.updateOne(
            { email },
            {
                $set: {
                    fcm_token,
                },
            }
        );
        const updateUser = await userModal.findOne({ email });
        return {
            success: true,
            message: "Login successful",
            user: updateUser,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
            user: null,
        };
    }
};

export const getUserDetails = async (parent, args, context, info) => {
    try {
        const userId = context.req.headers.authorization;
        if (!userId) {
            return {
                success: false,
                message: "No authentication: Authorization header is missing",
                user: null,
            };
        }
        const user = await userModal.findById(userId);
        return {
            success: true,
            message: "User Fetched Successfully",
            user: user,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
            user: null,
        };
    }
};
