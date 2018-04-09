import gql from 'graphql-tag';

export default gql`
  mutation CreateStash(
    $name: String!
    $lat: Float!
    $lng: Float!
    $claimCode: String!
    $clue1: String!
    $clue2: String!
    $claimed: Boolean
  ) {
    createStash(
      name: $name
      lat: $lat
      lng: $lng
      claimCode: $claimCode
      clue1: $clue1
      clue2: $clue2
      claimed: $claimed
    ) {
      id
      name
      lat
      lng
      claimCode
      clue1
      clue2
      claimed
    }
  }
`;
