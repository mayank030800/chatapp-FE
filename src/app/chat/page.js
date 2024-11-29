"use client";

import React, { useState, useEffect } from "react";

const ChatPage = () => {
  const [ws, setWs] = useState(null);
  const [rooms, setRooms] = useState([]); // Rooms fetched from the backend
  const [currentRoom, setCurrentRoom] = useState(null); // Active room
  const [messages, setMessages] = useState([]); // Messages for the active room
  const [newMessage, setNewMessage] = useState("");


  // Fetch rooms for the user
  const getRoomsForUser = async () => {
    const userId = 2;
    try {
      const authToken = localStorage.getItem("token"); 
      console.log(authToken)  
      const response = await fetch(`http://localhost:1337/api/rooms/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json();
      console.log(data)
      setRooms(data?.data); // Populate the room list
      if (data?.data?.length > 0) {
        setCurrentRoom(data.data[0]); // Set the first room as active by default
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  // Initialize WebSocket connection
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:1337");
    setWs(socket);

    socket.onopen = () => {
      console.log("WebSocket connected.");
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Message from server:", message);

      // Append the message to the current room
      if (message.roomId === currentRoom?.id) {
        setMessages((prev) => [...prev, { text: message.text, sender: "server" }]);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected.");
    };

    return () => {
      socket.close();
    };
  }, [currentRoom]);

  // Fetch rooms when the component mounts
  useEffect(() => {
    getRoomsForUser();
  }, []);

  // Send a message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    if (ws && ws.readyState === WebSocket.OPEN) {
      const message = { text: newMessage, roomId: currentRoom?.id };
      ws.send(JSON.stringify(message)); // Send message to the server

      // Add the message locally
      setMessages((prev) => [...prev, { text: newMessage, sender: "me" }]);
      setNewMessage("");
    } else {
      console.error("WebSocket is not connected.");
    }
  };

  // Switch to a different room
  const switchRoom = (room) => {
    setCurrentRoom(room); // Update the active room
    setMessages([]); // Clear messages for the new room
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar for Rooms */}
      <div className="w-full md:w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">Your Rooms</h2>
        <ul className="space-y-2">
          {rooms.map((room) => (
            <li
              key={room.id}
              className={`p-2 rounded-lg cursor-pointer ${
                room.id === currentRoom?.id ? "bg-gray-600" : "hover:bg-gray-700"
              }`}
              onClick={() => switchRoom(room)}
            >
              {room.roomId}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 bg-white border-b">
          <h2 className="text-lg font-bold">
            Chat - {currentRoom ? currentRoom.roomId : "Select a Room"}
          </h2>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {messages.length === 0 ? (
            <p className="text-gray-500">No messages yet.</p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.sender === "me" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-4 py-2 rounded-lg ${
                    msg.sender === "me"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white border-t flex">
          <input
            type="text"
            className="flex-1 border rounded-lg p-2"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
