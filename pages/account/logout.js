import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@context/auth';
import Layout from '@components/Layout';

const AccountLogout = () => {
  const { logout } = useAuth();
  const router = useRouter();
  useEffect(() => {
    logout();
    router.push('/');
  }, []);

  return <Layout />;
};

export default AccountLogout;
