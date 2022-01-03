import { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import './styles.css';
import NavLink from './components/NavLink';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import Posts from './pages/Posts';
function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  const logOutUser = () => {
    signOut(auth);
    setIsAuth(false);
    localStorage.clear('isAuth');
  };

  return (
    <BrowserRouter>
      <header>
        <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <NavLink link='/'>Home</NavLink>
          </div>
          <div>
            <NavLink link='/post'>Post</NavLink>
          </div>
          <div>
            <NavLink link='/contact'>Contact</NavLink>
          </div>
          {isAuth ? (
            <div onClick={logOutUser}>
              <NavLink link='/login'>Log out</NavLink>
            </div>
          ) : (
            <div>
              <NavLink link='/login'>Login</NavLink>
            </div>
          )}
        </nav>
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
        <Route path='/post' element={<Posts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
