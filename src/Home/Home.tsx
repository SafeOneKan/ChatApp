import { FC } from "react";
import Navbar from "../Bars/Navbar";
import "../static/Home_css/Home.scss";

const Home: FC = () => {
  return (
    <div className="body-container">
      <Navbar Page="Home" />
    </div>
  );
};

export default Home;
