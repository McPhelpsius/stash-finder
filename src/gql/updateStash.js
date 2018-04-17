import gql from 'graphql-tag';

export default gql`
  mutation UpdateStash(
    $id: ID!
    $name: String
    $lat: Float!
    $lng: Float!
    $claimCode: String
    $clue1: String
    $clue2: String
  ) {
    updateStash(
      id: $id
      name: $name
      lat: $lat
      lng: $lng
      claimCode: $claimCode
      clue1: $clue1
      clue2: $clue2
    ) {
      name
      lat
      lng
      claimCode
      clue1
      clue2
    }
  }
`;
