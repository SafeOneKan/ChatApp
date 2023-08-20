import { FC } from "react";
import "./static/bar.css";

const LeftBar: FC = () => {
  return (
    <>
      <div className="pannel-left">
        <div className="category">Category 1</div>
        <div className="category">Category 2</div>
        <div className="category">Category 3</div>
        <div className="category">Category 4</div>
        <div className="category">Category 5</div>
      </div>
    </>
  );
};

export default LeftBar;
