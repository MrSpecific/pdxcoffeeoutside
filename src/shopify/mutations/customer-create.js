import { gql } from '@apollo/client';

const customerCreateMutation = /* GraphQL */ gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customer {
        id
      }
    }
  }
`;
export default customerCreateMutation;
