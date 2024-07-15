import React, { useState, useEffect } from "react";

const JoinMeeting = () => {
  const [roomId, setRoomId] = useState("");
  const [scheduledMeetings, setScheduledMeetings] = useState(
    JSON.parse(localStorage.getItem("scheduledMeetings")) || []
  );

  useEffect(() => {
    const cleanUpOldMeetings = () => {
      const now = new Date();
      const updatedMeetings = scheduledMeetings.filter((meeting) => {
        const meetingTime = new Date(meeting.date);
        return now < new Date(meetingTime.getTime() + 30 * 60000); // Keep meetings within 30 minutes after their scheduled time
      });
      setScheduledMeetings(updatedMeetings);
      localStorage.setItem(
        "scheduledMeetings",
        JSON.stringify(updatedMeetings)
      );
    };

    cleanUpOldMeetings();
    const interval = setInterval(cleanUpOldMeetings, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [scheduledMeetings]);

  const handleJoin = (room) => {
    const meeting = scheduledMeetings.find((m) => m.roomId === room);
    if (meeting) {
      const now = new Date();
      const meetingTime = new Date(meeting.date);
      if (now >= meetingTime) {
        startMeeting(room);
      } else {
        alert(
          "The meeting is scheduled for ${meetingTime.toLocaleString()}. Please wait until the meeting starts."
        );
      }
    } else {
      startMeeting(room);
    }
  };

  const startMeeting = (room) => {
    const domain = "meet.ultraxpert.in";
    const options = {
      roomName: room,
      width: "100%",
      height: 600,
      parentNode: document.querySelector("#jitsi-container"),
      configOverwrite: {},
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: [
          "microphone",
          "camera",
          "closedcaptions",
          "desktop",
          "embedmeeting",
          "fullscreen",
          "fodeviceselection",
          "hangup",
          "profile",
          "chat",
          "recording",
          "livestreaming",
          "etherpad",
          "sharedvideo",
          "settings",
          "raisehand",
          "videoquality",
          "filmstrip",
          "invite",
          "feedback",
          "stats",
          "shortcuts",
          "tileview",
          "videobackgroundblur",
          "download",
          "help",
          "mute-everyone",
        ],
      },
    };
    const api = new window.JitsiMeetExternalAPI(domain, options);

    api.addEventListener("readyToClose", () => {
      window.location.href = "/";
    });
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Enter Room Number"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => handleJoin(roomId)}
      >
        Join Meeting
      </button>

      <h2 className="text-2xl font-bold my-4">Scheduled Meetings</h2>
      <div className="flex flex-col items-center">
        {scheduledMeetings.map((meeting, index) => (
          <div key={index} className="mb-4 p-2 border border-gray-300 rounded">
            <p>Room ID: {meeting.roomId}</p>
            <p>Date: {new Date(meeting.date).toLocaleString()}</p>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
              onClick={() => handleJoin(meeting.roomId)}
            >
              Join
            </button>
          </div>
        ))}
      </div>

      <div id="jitsi-container" className="mt-4"></div>
    </div>
  );
};

export default JoinMeeting;
