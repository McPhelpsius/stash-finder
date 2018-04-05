import gql from 'graphql-tag';

export default gql`
  mutation CreateStash(
    $id: ID!
    $name: String!
    $lat: Float!
    $long: Float!
    $claimCode: String!
    $clue1: String!
    $clue2: String!
    $claimed: Boolean
  ) {
    createStash(
      id: $id
      name: $name
      lat: $lat
      long: $long
      claimCode: $claimCode
      clue1: $clue1
      clue2: $clue2
      claimed: $claimed
    ) {
      id
      name
      lat
      long
      claimCode
      clue1
      clue2
      claimed
    }
  }
`;
