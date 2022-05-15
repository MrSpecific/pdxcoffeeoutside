import Link from 'next/link';
import { useState } from 'react';
import Layout from '@components/Layout';
import { useAuth } from '@context/auth';

export default function AccountRecover() {
  const { recover } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const { success } = await recover(email);
  };

  return (
    <Layout>
      <h1>Recover your account</h1>
      <form method="POST" onSubmit={handleSubmit}>
        <input name="email" />
        <button type="submit">Submit</button>
      </form>
      <div>
        <Link href="/account/login" passHref>
          <a>Already have an account?</a>
        </Link>
      </div>
    </Layout>
  );
}
