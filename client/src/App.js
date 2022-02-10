import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';

import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';
import PageNotFound from './pages/PageNotFound';
import { AuthContext } from './helpers/AuthContext';

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    Axios.get("http://localhost:3001/auth/auth", { headers:
      { accessToken: localStorage.getItem('accessToken')
    }}).then((response) => {
      if (response.data.error) {
        setAuthState({
          ...authState, status: false,
        });
      } else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      };
    });
  }, []);

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
        <div className="navbar">
          <Link to="/">Home</Link>
          { !authState.status ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/registration">Create Account</Link>
            </>
          ) : (
            <>
            <Link to="/createpost">Say something...</Link>
            <button onClick={logout}>Logout</button>
            </>
          )}
          <h1>{authState.username}</h1>
        </div>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/createpost" exact element={<CreatePost />} />
            <Route path="/post/:id" exact element={<Post />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/registration" exact element={<Registration />} />
            <Route path="*" exact element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;