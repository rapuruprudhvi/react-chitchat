import React from "react";
import { auth } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import NavBar from "./NavBar";
import ChatBox from "./Chatbox.js";
import Welcome from "./Welcome.js";
import AddContact from "./AddContact.js";
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = () => {
  // const [user] = useAuthState(auth);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 p-0"> {/* Set padding to 0 */}
          <div style={{ height: '100vh',display: 'flex', flexDirection: 'column', border: '1px solid #ccc', flex: 1, overflowY: 'scroll' }}>
            <div className="row position-fixed">
              <div className="col-2"></div>
              <div className="col-10">
                <AddContact />
              </div>
              {/* <div className="col-2"></div> */}
            </div>
          </div>
        </div>

        <div className="col-9 p-0">
          <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', border: '1px solid #ccc' }}>
            <div style={{ flex: 1, overflowY: 'scroll' }}>
            <NavBar /> {/* Navigation bar at the top */}
              <ChatBox />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;





