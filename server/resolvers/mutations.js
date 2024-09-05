import { userLogin, userSignup } from "../controller/user.js";

const MutationResolver = {
    Mutation: {
        signup: (parent, args, context, info) => userSignup(parent, args, context, info),
        login: (parent, args, context, info) => userLogin(parent, args, context, info),
    },
};

export default MutationResolver;
