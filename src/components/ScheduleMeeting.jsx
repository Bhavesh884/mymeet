import React, { useState } from "react";

const ScheduleMeeting = () => {
  const [meetingDateTime, setMeetingDateTime] = useState("");
  const [roomName, setRoomName] = useState("");

  const handleScheduleMeeting = (e) => {
    e.preventDefault();
    const roomName = generateUniqueRoomName(); // Implement your own function to generate room names
    window.location.href = `/meeting/${roomName}`;
  };

  const generateUniqueRoomName = () => {
    // Implement logic to generate a unique room name dynamically
    return `meeting-${Math.random().toString(36).substr(2, 5)}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Schedule a Meeting</h1>
      <form
        onSubmit={handleScheduleMeeting}
        className="flex flex-col space-y-4"
      >
        <input
          type="datetime-local"
          value={meetingDateTime}
          onChange={(e) => setMeetingDateTime(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Enter Room Name"
          className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="btn-primary">
          Schedule Meeting
        </button>
      </form>
    </div>
  );
};

export default ScheduleMeeting;
