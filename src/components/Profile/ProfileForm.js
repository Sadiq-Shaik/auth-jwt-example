import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC2bA9Nxku6Si_2xoPq7904PepytNiQFTw",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          // idToken:
          //   "eyJhbGciOiJSUzI1NiIsImtpZCI6IjI3ZGRlMTAyMDAyMGI3OGZiODc2ZDdiMjVlZDhmMGE5Y2UwNmRiNGQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVhY3QtcHJhY3Rpc2UtYzM0ODYiLCJhdWQiOiJyZWFjdC1wcmFjdGlzZS1jMzQ4NiIsImF1dGhfdGltZSI6MTY0NTI1NDgyNiwidXNlcl9pZCI6ImhUYk5BT1BrWUhlcjFJd0pHNjV4OUJVYjhwZzIiLCJzdWIiOiJoVGJOQU9Qa1lIZXIxSXdKRzY1eDlCVWI4cGcyIiwiaWF0IjoxNjQ1MjU0ODI2LCJleHAiOjE2NDUyNTg0MjYsImVtYWlsIjoidGVzdEBnZy5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEBnZy5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.p7bWy-IZa-FJAQuPWD5sSIHUh82r3zlOt0qNtkSAXgxtOSjJ_lAzygrm4GVoyusyvlFStHAsvJy02t6O6wMh2v7VXNbRlwdbTd9fsYAQEuJ93-Mp3ELvGNmKW95QzAoh6-F0UuO0TBTj_2-WYTEUF9gHYqETWBD5HcYsxtSyVzVp4pZDxvdQ4MB2qxCDQ8Be6dYnbQu8U2irSbG7i6F_K6XoOA3eG0JNmMgn6MYFwy65QU5XcAX8V2fnLhxhQr79ybN4mbF_GhUqW51zAwLNydPeWkh-v7JIw5UFHPlXwAppP1GjGy45AauHh4SGJEUFywsdej9kgMvOawnZSoujpQ",
          password: enteredNewPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => {
        console.log("Password change successful");
        history.replace("/");
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
