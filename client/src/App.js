import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';

function App() {
  return (
    <div className="App">
      <Router>
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/createpost">Say something...</Link>
      </div>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/createpost" exact element={<CreatePost />} />
          <Route path="/post/:id" exact element={<Post />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;