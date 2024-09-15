import React, { useEffect, useState } from "react";
import { IonContent, IonHeader, IonPage, useIonRouter } from "@ionic/react";
import "./login.css";
import IconInput from "../../components/icon-input";
import IconButton from "../../components/icon-button";
import EmailIcon from "../../../public/icon/email-icon";
import LockIcon from "../../../public/icon/lock-icon";
import EyeIcon from "../../../public/icon/eye-icon";
import GoogleIcon from "../../../public/icon/google-icon";

const Login: React.FC = () => {
  const router = useIonRouter();

  const navigateToSubPage = () => {
    router.push("/tab1/subpage");
  };

  const navigateToOrderPage = () => {
    router.push("/tab1/order");
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 576);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 576);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    console.log("Email:", email, "Password:", password);
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div
          style={{
            maxWidth: 1024,
            margin: "auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: "85vh",
            padding: "0 20px",
          }}
        >
          {!isMobile && (
            <div style={{ flex: 1, maxWidth: "50%" }}>
              <img
                src="/img/login-image.png"
                alt="login image"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "20px",
                }}
              />
            </div>
          )}

          <div
            style={{
              flex: 1,
              padding: "0 40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <h2 style={{ fontSize: "32px", marginBottom: "10px" }}>Sign in</h2>
            {!isMobile && (
              <p style={{ marginBottom: "20px" }}>Hi, let's jump in! 👋</p>
            )}

            <div style={{ width: "100%" }}>
              <div style={{ marginBottom: "20px" }}>
                <IconInput
                  title="Email Address"
                  onInputHandleChange={handleEmailChange}
                  leftIcon={<EmailIcon />}
                  placeholder="Enter Email Address"
                  width="100%"
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <IconInput
                  title="Password"
                  onInputHandleChange={handlePasswordChange}
                  leftIcon={<LockIcon />}
                  rightIcon={<EyeIcon />}
                  onRightIconClick={togglePasswordVisibility}
                  placeholder="Enter Password"
                  width="100%"
                  type={showPassword ? "text" : "password"}
                />
              </div>

              <IconButton
                text="Login"
                textColor="white"
                backgroundColor="#042628"
                hoverColor="#314647"
                onClick={handleGoogleLogin}
                width="100%"
              />
            </div>

            <p
              style={{
                marginTop: "20px",
                alignSelf: "center",
                color: "#97A2B0",
              }}
            >
              or continue with
            </p>

            <IconButton
              icon={<GoogleIcon />}
              text="Login with Google"
              textColor="white"
              backgroundColor="#ff6b6b"
              hoverColor="#ff8787"
              onClick={handleGoogleLogin}
              width="100%"
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
