import { serialize } from 'cookie';

export default function setTokenSuccessRes({ res, customerAccessToken, expiresAt }) {
  res.setHeader(
    'Set-Cookie',
    serialize('customer-access-token', customerAccessToken, {
      path: '/',
      httpOnly: true,
      expires: new Date(expiresAt),
    })
  );
  return res.status(200).json({ success: true });
}
