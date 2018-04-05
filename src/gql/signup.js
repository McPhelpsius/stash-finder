import gql from 'graphql-tag';

export default gql`
  mutation SignUp($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
        role
      }
    }
  }
`;
