import {
  GraphQLFloat,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const LocationType = new GraphQLObjectType({
  name: "Location",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    lat: { type: GraphQLFloat },
    lon: { type: GraphQLFloat },
    userId: { type: GraphQLID },
  }),
});

export const WeatherType = new GraphQLObjectType({
  name: "Weather",
  fields: () => ({
    location: { type: LocationType },
    temperature: { type: GraphQLFloat },
    description: { type: GraphQLString },
  }),
});
