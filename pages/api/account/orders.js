import cookie from 'cookie';

export default async function handler(req, res) {
  console.log(cookie.parse(req.headers.cookie));

  res.status(200).json({ message: 'working' });
}
