import { auth } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import NavBar from "./NavBar";
import ChatBox from "./Chatbox";
import Welcome from "./Welcome";
import AddContact from "./AddContact";

function App() {
  
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <NavBar />
      {!user ? <Welcome /> : <ChatBox />}
      <AddContact />
    </div>
  );
}
export default App;