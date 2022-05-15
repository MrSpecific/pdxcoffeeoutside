export default function setInvalidTokenRes({ res }) {
  res.setHeader(
    'Set-Cookie',
    serialize('customer-access-token', '', {
      path: '/',
      httpOnly: true,
      maxAge: 0,
    })
  );
  return res.status(200).json({ success: false, message: 'Token invalid' });
}
