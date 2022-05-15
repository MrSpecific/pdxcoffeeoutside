import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '@components/Layout';
import { useAuth } from '@context/auth';

export default function AccountIndex() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async function () {
      if (isLoggedIn) {
        // const res = await fetch('/api/account/orders');
      }
    })();
  }, [isLoggedIn]);

  // redirect to login page if not logged in
  // useEffect(() => {
  //   if (!isLoggedIn) router.push('/account/login');
  // }, [isLoggedIn]);

  return (
    <Layout>
      <h1>Account Details</h1>
      <p>{isLoggedIn ? 'You are currently logged in' : 'You are not currently logged in'}</p>
      <ul>
        <li>
          {!isLoggedIn ? (
            <Link href="/account/login">
              <a>Login</a>
            </Link>
          ) : (
            <Link href="/account/logout">
              <a>Log out</a>
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  );
}
