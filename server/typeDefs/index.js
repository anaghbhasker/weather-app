import { gql } from "apollo-server-express";
const typeDefs = gql`
    scalar Date
    type Location {
        location_name: String
        type:String
        lat: Float
        lon: Float
    }
    type User {
        _id: String
        username: String
        email: String
        password: String
        locations: [Location]
        fcm_token:String
        createdAt: Date
        updatedAt: Date
    }
    input LocationInput {
        location_name: String
        type:String
        lat: Float
        lon: Float
    }
    input SignupUser {
        username: String
        email: String
        password: String
        locations: [LocationInput]
    }

    type SignupResponse {
        success: Boolean!
        message: String
        user: User
    }

    input LoginUser {
        email: String
        password: String
        fcm_token: String
    }

    type LoginResponse {
        success: Boolean!
        message: String
        user: User
    }
    type userDetailResponse {
        success: Boolean!
        message: String
        user: User
    }

    type Query {
        userDetail:userDetailResponse
    }

    type Mutation {
        signup(input: SignupUser): SignupResponse!
        login(input: LoginUser): LoginResponse!
    }
`;

export default typeDefs;
