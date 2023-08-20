import { useState } from "react";
import google from "../static/images/72al1e4ro5hf516deodneiddfc.png";
import { UserAuth } from "../Context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../static/Auth_css/SignIn.scss";
import { Link, useNavigate } from "react-router-dom";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db, storage } from "../Configs/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { UserCredential, updateProfile } from "firebase/auth";

const Signin = () => {
  const context = UserAuth();

  const insertUser = (
    usercred: UserCredential,
    downloadURL: string | null = null
  ) => {
    setDoc(doc(db, "users", usercred.user.uid), {
      uid: usercred.user.uid,
      displayName: usercred.user.displayName,
      email: usercred.user.email,
      photoURL: downloadURL ? downloadURL : usercred.user.photoURL,

      friends: [],
    });
  };

  const { SignInGoogle } = context;
  const navigate = useNavigate();
  const handleSigninGoogle = async () => {
    try {
      const usercred = await SignInGoogle();
      if (usercred?.user) {
        const usersCollectionRef = collection(db, "users");
        const q = query(
          usersCollectionRef,
          where("email", "==", usercred.user.email)
        );
        const isEmpty = (await getDocs(q)).empty;
        if (isEmpty) {
          await insertUser(usercred);
          navigate("/api");
        }
      }
    } catch (e) {
      alert(e);
    }
  };

  const handlesub = async (e: any) => {
    e.preventDefault();
    const Name = e.target[0].value;
    const Email = e.target[1].value;
    const Password = e.target[2].value;
    const profil_pic_file = e.target[3].files[0];

    try {
      const usercred = await context?.createUser(Email, Password);

      const storef = ref(storage, Name);
      const pic = await uploadBytes(storef, profil_pic_file);
      console.log(pic);
      if (usercred) {
        getDownloadURL(pic.ref).then(async (downloadURL) => {
          await updateProfile(usercred.user, {
            displayName: Name,
            photoURL: downloadURL,
          });
          await insertUser(usercred, downloadURL);
          navigate("/api");
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [selected_file, setSelected_file] = useState<File | null>(null);
  const handleSelectedFile = (e: any) => {
    setSelected_file(e.target.files[0]);
  };
  return (
    <div className="signin-cont">
      <div className="table">
        <Link className="title" to="/">
          SafeChat
        </Link>

        <form onSubmit={handlesub}>
          <input type="text" name="name" id="name" placeholder="Display Name" />
          <input type="email" name="mail" id="mail" placeholder="Email" />
          <input type="password" name="pass" id="pass" placeholder="Password" />
          <input
            style={{ display: "none" }}
            type="file"
            name="file"
            id="file"
            onChange={handleSelectedFile}
          />
          <label htmlFor="file">
            <FontAwesomeIcon className="avatar-icon" icon={faUserSecret} />
            {selected_file ? (
              <span style={{ fontSize: "15px" }}> {selected_file.name} </span>
            ) : (
              <span>Add An Avatar</span>
            )}
          </label>
          <button>Sign In</button>
        </form>
        <div style={{ fontWeight: 100 }}>Or</div>
        <button onClick={handleSigninGoogle}>
          <img src={google} alt="google" />
          <span>Sign In With Google</span>
        </button>
        <div>
          already have an account ? <Link to="/login"> Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
