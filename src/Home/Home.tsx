import { FC } from "react";
import Navbar from "../Bars/Navbar";
import "../static/Home_css/Home.scss";

const Home: FC = () => {
  return (
    <div className="body-container">
      <Navbar Page="Home" />
      <div className="boda">
        <div className="card1">
          <div className="welcome">Welcome to SafeChat</div>
          <div className="img"></div>
          <button className="start">Start Surfing</button>
        </div>
        <div className="card2">
          <div className="box">
            <ul>
              <li>End-to-End Encryption</li>
              <li>Safe Group Chats</li>
              <li>Crystal-Clear Calls</li>
              <li>Expressive Emojis and GIFs</li>
              <li>File Fortresses</li>
              <li>Guarded Themes</li>
              <li>Safety First</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
