import React from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { setAccessToken } from "../../store/AccessTokenStore";
import { useUser } from "../../hooks/useUserContext";

const GoogleAuth = () => {
  const { push } = useHistory()
  const { getUser: doLogin } = useUser()

    const responseSuccessGoogle = (response) => {
        //console.log('Success')
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_HOST}/googlelogin`,
      data: { tokenId: response.tokenId },
    }).then((response) => {
        console.log('responseAxios', response)
      setAccessToken(response.data.token);
      doLogin().then(() => push("/profile"));
    });
  };

    const responseErrorGoogle = (response) => {
      console.log('Login failed', response)
  };

  return (
    <div>
      <GoogleLogin
        clientId="133783976566-p3ilg93e7mlemi931s14n0aboa0ar9uk.apps.googleusercontent.com"
        buttonText="Continue with Google"
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={"single_host_origin"}
        className="btn btn-light mx-1 w-100 mt-5 LoginButton"
      />
    </div>
  );
};

export default GoogleAuth;
