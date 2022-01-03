import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';

function Home() {
  const postCollection = collection(db, 'post');
  const [postList, setPosList] = useState([]);
  const [deleteref, setDeleteref] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const response = await getDocs(postCollection);
      const tranformedData = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosList(tranformedData);
      setDeleteref(false);
    };
    getData();
  }, [postCollection, deleteref]);

  const deletePost = async (id) => {
    const postDoc = doc(db, 'post', id);

    await deleteDoc(postDoc);
    setDeleteref(true);
  };
  return (
    <div>
      <h1>Home page here</h1>

      {postList &&
        postList.map((post) => (
          <div
            key={post.id}
            style={{
              width: '250px',
              border: '1px solid #ccc',
              padding: '1rem',
              margin: '0 auto',
            }}
          >
            <div>{post.title}</div>
            <div>{post.message}</div>
            <div>By {post.author.name}</div>
            {post.author.id === auth?.currentUser?.uid ? (
              <button
                onClick={() => {
                  deletePost(post.id);
                }}
              >
                Delete
              </button>
            ) : (
              ''
            )}
          </div>
        ))}
    </div>
  );
}

export default Home;
