import React, { useState } from "react";

const CreateMeeting = () => {
  const [meetingType, setMeetingType] = useState(null);
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingEndDate, setMeetingEndDate] = useState("");
  const [roomId, setRoomId] = useState("");

  const handleCreateInstant = () => {
    const instantRoomId = Math.random().toString(36).substring(7);
    window.location.href = `https://meet.ultraxpert.in/${instantRoomId}`;
  };

  const handleScheduleMeeting = () => {
    const scheduledRoomId = roomId || Math.random().toString(36).substring(7);
    const meeting = {
      roomId: scheduledRoomId,
      date: meetingDate,
      endTime: meetingEndDate,
    };
    const scheduledMeetings =
      JSON.parse(localStorage.getItem("scheduledMeetings")) || [];
    scheduledMeetings.push(meeting);
    localStorage.setItem(
      "scheduledMeetings",
      JSON.stringify(scheduledMeetings)
    );
    alert(`Meeting scheduled with ID: ${scheduledRoomId}`);
    setMeetingType(null);
    setMeetingDate("");
    setMeetingEndDate("");
    setRoomId("");
  };

  return (
    <div className="flex flex-col items-center">
      {!meetingType && (
        <div className="space-x-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => setMeetingType("instant")}
          >
            Instant Meeting
          </button>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded"
            onClick={() => setMeetingType("scheduled")}
          >
            Schedule Meeting
          </button>
        </div>
      )}
      {meetingType === "instant" && handleCreateInstant()}
      {meetingType === "scheduled" && (
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter Room ID (optional)"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="datetime-local"
            value={meetingDate}
            onChange={(e) => setMeetingDate(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="datetime-local"
            value={meetingEndDate}
            onChange={(e) => setMeetingEndDate(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded"
            onClick={handleScheduleMeeting}
          >
            Schedule Meeting
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateMeeting;
