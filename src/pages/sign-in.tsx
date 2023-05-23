import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SignInPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { provider } = router.query;

  useEffect(() => {
    if (status !== 'loading' && !session) void signIn(`${provider}`);
    if (status !== 'loading' && session) window.close();
  }, [session, status, provider]);

  return null;
};

export default SignInPage;
