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
import { AuthContext } from './helpers/AuthContext';

function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/auth/auth", { headers:
      { accessToken: localStorage.getItem('accessToken')
    }}).then((response) => {
      if (response.data.error) {
        setAuthState(false);
      } else {
        setAuthState(true);
      };
    });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
        <div className="navbar">
          <Link to="/">Home</Link>
          <Link to="/createpost">Say something...</Link>
          { !authState && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/registration">Create Account</Link>
            </>
          )}
        </div>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/createpost" exact element={<CreatePost />} />
            <Route path="/post/:id" exact element={<Post />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/registration" exact element={<Registration />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;