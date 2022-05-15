export default function setErrorRes({ res }) {
  res.setHeader(
    'Set-Cookie',
    serialize('customer-access-token', '', {
      path: '/',
      httpOnly: true,
      maxAge: 0,
    })
  );
  return res.status(500).json({ success: false, message: 'Internal server error' });
}
