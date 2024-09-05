import gql from "graphql-tag";
const SIGN_UP_MUTATION = gql`
  mutation Signup($input: SignupUser) {
    signup(input: $input) {
      success
      message
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginUser) {
    login(input: $input) {
      message
      success
      user {
        _id
        email
      }
    }
  }
`;

const GET_LOCATION_BY_USER = gql`
  query UserDetail {
    userDetail {
      message
      success
      user {
        _id
        email
        locations {
          lat
          location_name
          lon
          type
        }
      }
    }
  }
`;

export { SIGN_UP_MUTATION, LOGIN_MUTATION, GET_LOCATION_BY_USER };
