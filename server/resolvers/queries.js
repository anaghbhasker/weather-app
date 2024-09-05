import { getUserDetails } from "../controller/user.js";

const QueryResolver = {
    Query: {
        userDetail: (parent, args, context, info) => getUserDetails(parent, args, context, info),
    },
};

export default QueryResolver;
