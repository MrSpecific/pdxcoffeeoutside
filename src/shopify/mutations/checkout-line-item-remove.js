import { gql } from '@apollo/client';
import { checkoutDetailsFragment } from '@shopify/queries/get-checkout-query';

const checkoutLineItemRemoveMutation = /* GraphQL */ gql`
  mutation checkoutLineItemRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
    checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
      checkoutUserErrors {
        code
        field
        message
      }
      checkout {
        ...checkoutDetails
      }
    }
  }
  ${checkoutDetailsFragment}
`;
export default checkoutLineItemRemoveMutation;
