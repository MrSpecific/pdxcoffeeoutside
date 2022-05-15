import { gql } from '@apollo/client';

const customerRecoverMutation = /* GraphQL */ gql`
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
export default customerRecoverMutation;
