import { signIn, signOut, useSession } from 'next-auth/react';

export default function SignOut() {
  const { data: session } = useSession();

  return (
    <div className='sign-in'>
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
              e.preventDefault();
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
