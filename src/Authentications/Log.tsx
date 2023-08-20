import google from "../static/images/72al1e4ro5hf516deodneiddfc.png";
import { UserAuth } from "../Context/AuthContext";
import "../static/Auth_css/SignIn.scss";
import { Link, Navigate } from "react-router-dom";

const Log = () => {
  const context = UserAuth();
  if (!context) return <div>Loading...</div>;
  const { SignInGoogle, logUser } = context;
  // const navigate = useNavigate();
  const handleSigninGoogle = async () => {
    try {
      await SignInGoogle();
      return <Navigate to="/api" />;
    } catch (e) {
      alert(e);
    }
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const Email = e.target[0].value;
    const Password = e.target[1].value;

    try {
      await logUser(Email, Password);
      return <Navigate to="/api" />;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="signin-cont">
      <div className="table">
        <Link className="title" to="/">
          SafeChat
        </Link>

        <form onSubmit={handleLogin}>
          <input type="email" name="mail" id="mail" placeholder="Email" />
          <input type="password" name="pass" id="pass" placeholder="Password" />
          <input
            style={{ display: "none" }}
            type="file"
            name="file"
            id="file"
          />

          <button>Login</button>
        </form>
        <div style={{ fontWeight: 100 }}>Or</div>
        <button onClick={handleSigninGoogle}>
          <img src={google} alt="google" />
          <span>Sign In With Google</span>
        </button>
        <div>
          dont'talready have an account ? <Link to="/signin"> Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Log;
