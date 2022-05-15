import { gql } from '@apollo/client';

const variantDetailsFragment = gql`
  fragment variantDetailsFragment on ProductVariant {
    id
    title
    product {
      title
    }
  }
`;

export default variantDetailsFragment;
