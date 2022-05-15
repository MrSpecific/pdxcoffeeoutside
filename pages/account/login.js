import router from 'next/router';
import Link from 'next/link';
import Layout from '@components/Layout';
import { useAuth } from '@context/auth';

export default function AccountLogin() {
  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const { success } = await login({ email, password });
    if (success) router.push('/account');
  };

  return (
    <Layout>
      <h1>Login</h1>
      <form method="POST" onSubmit={handleSubmit}>
        <input name="email" />
        <input name="password" type="password" />
        <button type="submit">Submit</button>
      </form>
      <div>
        <Link href="/account/recover" passHref>
          <a>Forgot your password?</a>
        </Link>
      </div>
    </Layout>
  );
}
