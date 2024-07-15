import React, { useState } from "react";
import JoinMeeting from "./components/JoinMeeting";
import CreateMeeting from "./components/CreateMeeting";

function App() {
  const [meetingType, setMeetingType] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">
        Welcome to UltraXpert Jitsi Meet
      </h1>
      {!meetingType && (
        <div className="space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setMeetingType("join")}
          >
            Join Meeting
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => setMeetingType("create")}
          >
            Create Meeting
          </button>
        </div>
      )}
      {meetingType === "join" && <JoinMeeting />}
      {meetingType === "create" && <CreateMeeting />}
      {meetingType && (
        <button
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => setMeetingType(null)}
        >
          Back
        </button>
      )}
    </div>
  );
}

export default App;
