import { signIn, signOut, useSession } from 'next-auth/react';

export default function SignIn() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className='sign-in'>
      {!session && (
        <>
          <span>You are not signed in</span>
          <a
            href={`/api/auth/signin`}
            className='btn'
            onClick={(e) => {
              e.preventDefault;
              signIn();
            }}
          >
            Sign in
          </a>
        </>
      )}
      {session?.user && (
        <>
          <span>
            <small>Signed in as </small>
            <strong>{session.user.name ?? session.user.email}</strong>
          </span>
          <a
            href={`/api/auth/signout`}
            className='btn'
            onClick={(e) => {
              e.preventDefault;
              signOut();
            }}
          >
            Sign out
          </a>
        </>
      )}
    </div>
  );
}
