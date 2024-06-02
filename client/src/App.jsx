import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreatePlaylist from './components/CreatePlaylist';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-playlist" element={<CreatePlaylist />} />
      </Routes>
    </Router>
  );
}

export default App
