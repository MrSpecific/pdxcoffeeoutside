import cookie from 'cookie';

import { shopifyClient } from '@shopify/index';
import { customerAccessTokenRenew } from '@shopify/mutations';
import { setInvalidTokenRes, setTokenSuccessRes, setTokenErrorRes } from '@utils/api';

async function renew({ customerAccessToken }) {
  const { data } = await shopifyClient.mutate({
    mutation: customerAccessTokenRenew,
    variables: {
      customerAccessToken: `${customerAccessToken}`,
    },
  });
  const {
    customerAccessToken: { accessToken, expiresAt },
    userErrors,
  } = data.customerAccessTokenRenew;
  if (accessToken && expiresAt) {
    return { success: true, customerAccessToken: accessToken, expiresAt };
  }
  return { success: false };
}

export default async function handler(req, res) {
  try {
    const customerAccessTokenCookie = cookie.parse(req?.headers?.cookie || '')[
      'customer-access-token'
    ];
    if (customerAccessTokenCookie) {
      const { customerAccessToken, success, expiresAt } = await renew({
        customerAccessToken: customerAccessTokenCookie,
      });

      if (success) {
        return setTokenSuccessRes({ res, customerAccessToken, expiresAt });
      }
      return setInvalidTokenRes({ res });
    }
    return setInvalidTokenRes({ res });
  } catch (error) {
    console.log(error);
    return setTokenErrorRes({ res });
  }
}
