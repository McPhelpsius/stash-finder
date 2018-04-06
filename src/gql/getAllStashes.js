import gql from 'graphql-tag';

export default gql`
  query getAllStashes {
    stashes {
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
