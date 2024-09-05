import QueryResolver from "./queries.js";
import MutationResolver from "./mutations.js";

const resolvers = {
    Query: Object.assign({}, QueryResolver.Query),
    Mutation: Object.assign({}, MutationResolver.Mutation),
};

export default resolvers;
