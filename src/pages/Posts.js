import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
export default function Posts() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const postCollection = collection(db, 'post');
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (!userAuth) {
        navigate('/login', { replace: true });
      }
    });
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await addDoc(postCollection, {
      title,
      message,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    });
    console.log(title, message);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <input
            type='text'
            name='title'
            value={title}
            placeholder='title'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <textarea
            name='message'
            cols='30'
            rows='10'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div>
          <button type='submit'>Send</button>
        </div>
      </form>
    </div>
  );
}
