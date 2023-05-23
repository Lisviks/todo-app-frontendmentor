import { useSession } from 'next-auth/react';
import { useState } from 'react';
import NewWindow from 'react-new-window';

export default function SignInModal() {
  const [popup, setPopup] = useState(false);
  const [provider, setProvider] = useState('');
  const { data: session } = useSession();

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>Sign In</h2>
        <p>You are not signed in</p>
        <button
          className='btn'
          onClick={() => {
            setPopup(true);
            setProvider('github');
          }}
        >
          Sign in with GitHub
        </button>
        <button
          className='btn'
          onClick={() => {
            setPopup(true);
            setProvider('google');
          }}
        >
          Sign in with Google
        </button>
      </div>

      {popup && !session && provider ? <NewWindow url={`sign-in?provider=${provider}`} /> : null}
    </div>
  );
}
