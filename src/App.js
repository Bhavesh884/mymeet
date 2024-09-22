import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import JoinMeeting from "./components/JoinMeeting";
import CreateMeeting from "./components/CreateMeeting";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-8">
          Welcome to UltraXpert Jitsi Meet
        </h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<JoinMeeting />} />
          <Route path="/create" element={<CreateMeeting />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => {
  return (
    <div className="space-x-4">
      <Link to="/join" className="bg-blue-500 text-white px-4 py-2 rounded">
        Join Meeting
      </Link>
      <Link to="/create" className="bg-green-500 text-white px-4 py-2 rounded">
        Create Meeting
      </Link>
    </div>
  );
};

export default App;
