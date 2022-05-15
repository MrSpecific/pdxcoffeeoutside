import { shopifyClient } from '@shopify/index';
import { customerAccessTokenCreateMutation } from '@shopify/mutations';
import { setTokenSuccessRes, setErrorRes } from '@utils/api';

async function login({ email, password }) {
  try {
    const { data } = await shopifyClient.mutate({
      mutation: customerAccessTokenCreateMutation,
      variables: {
        input: {
          email,
          password,
        },
      },
    });
    const { accessToken, expiresAt } = data.customerAccessTokenCreate.customerAccessToken;
    return { success: true, accessToken, expiresAt };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

export default async function handler(req, res) {
  try {
    const { email, password } = req.headers;
    const { success, accessToken, expiresAt } = await login({ email, password });
    if (success) {
      return setTokenSuccessRes({ res, customerAccessToken: accessToken, expiresAt });
    }
    return setErrorRes({ res });
  } catch (error) {
    return setErrorRes({ res });
  }
}
