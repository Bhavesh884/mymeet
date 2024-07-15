import React, { useRef, useEffect } from "react";

const MeetingRoom = ({ roomName }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const domain = "meet.ultraxpert.in"; // Replace with your Jitsi Meet server domain
    const options = {
      roomName: roomName,
      parentNode: containerRef.current,
      userInfo: {
        displayName: "User Name", // Replace with the display name of the user
      },
    };
    const api = new window.JitsiMeetExternalAPI(domain, options);
    api.on("readyToClose", () => {
      window.location.href = "https://www.ultraxpert.in";
    });

    api.on("videoConferenceLeft", () => {
      window.location.href = "https://www.ultraxpert.in";
    });

    return () => {
      api.dispose();
    };
  }, [roomName]);

  return <div ref={containerRef} className="w-full h-screen" />;
};

export default MeetingRoom;
