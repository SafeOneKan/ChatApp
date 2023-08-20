import { FC } from "react";
import "../static/Bars_css/navBar.scss";
import { UserAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
interface Navigation {
  Page?: string;
}

const Navbar: FC<Navigation> = ({ Page }) => {
  const context = UserAuth();
  if (!context) return <div>Loading...</div>;
  const { LogOut, user } = context;

  const handleSignout = async () => {
    try {
      await LogOut();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={Page == "Home" ? "mainNav" : "secNav"}>
      <Link className="title" to="/">
        SafeChat
      </Link>
      <div className="components">
        <Link to="/">Home</Link>
        <Link to="/api">Api</Link>
        {user?.displayName ? (
          <button className="logout" onClick={handleSignout}>
            Log Out
          </button>
        ) : (
          <Link to="/SignIn">SignIn</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
