import gql from 'graphql-tag';

export default gql`
  mutation ClaimStash($id: ID!, $claimCode: String!) {
    claimStash(id: $id, claimCode: $claimCode) {
      id
      claimed
    }
  }
`;
