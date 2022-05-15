import cookie, { serialize } from 'cookie';
import { shopifyClient } from '@shopify/index';
import { customerAccessTokenDeleteMutation } from '@shopify/mutations';

async function logout({ customerAccessToken }) {
  const { data } = await shopifyClient.mutate({
    mutation: customerAccessTokenDeleteMutation,
    variables: {
      customerAccessToken: `${customerAccessToken}`,
    },
  });
  return data;
}

export default async function handler(req, res) {
  try {
    const customerAccessToken = cookie.parse(req.headers.cookie)['customer-access-token'];
    const data = await logout({ customerAccessToken });
    res.setHeader(
      'Set-Cookie',
      serialize('customer-access-token', '', { path: '/', httpOnly: true, maxAge: 0 })
    );
    return res.status(200).json({ success: true, message: 'Logout success' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
