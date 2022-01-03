import { useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';
export default function Login({ setIsAuth }) {
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (!userAuth) return;
      navigate('/', { replace: true });
      setIsAuth(true);
      localStorage.setItem('isAuth', true);
    });
  }, [navigate, setIsAuth]);
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <button onClick={signInWithGoogle}> Login with google</button>
      <button>Logout</button>
    </div>
  );
}
