import React from "react";
import { auth } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import NavBar from "./NavBar";
import Layout from "./Layout.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatBox from "./Chatbox.js";
import Welcome from "./Welcome.js";


function App() {
  const [user] = useAuthState(auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Layout /> : <Welcome/>} 
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;