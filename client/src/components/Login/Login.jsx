import FormRegister from "./FormRegister/FormRegister";
//import Nav from "./Nav/Nav";
//import WavesLogin from "../Waves/WavesLogin/WavesLogin";
import spin from "../assets/spin.png";
//import Presentation from "../Assets/img/Presentationlogin-presentation.png";
import { useEffect, useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
//import "@fontsource/roboto/300.css";
import { useDispatch, useSelector } from "react-redux";
//import { useForm } from "../../Hooks/useForm";
import { Box, Button } from "@mui/material";
//import { Redirect } from "react-router-dom";
import { setIsLog, setUserName } from "../../Redux/Slices";
import { useForm } from "../../hooks/useForm";
import validationsForm from "../../utils/ValidationForm";
import Nav from "../LandingPage/nav/Nav";
import FormLogin from "./formLogin/FormLogin";
import SideBar from "../SideBar/SideBar"
import { Link, Navigate } from "react-router-dom";


const Login = () => {
  const initialForm = {
    email: "",
    password: "",
    name: "",
    birthday: "",
    lastname: "",
    registerpassword: "",
    verifypassword: "",
    registerEmail: "",
    country: "",
    userName: "",
  };

  const [loginType, setLoginType] = useState("login");
  const url = window.location.href;

  const mode = useSelector((state) => state.theme.mode);
  const Theme = useSelector((state) => state.theme);
  const {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
    handleSubmits,
    handleImage,
    image,
    previewUrl,
  } = useForm(initialForm, validationsForm);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("token")));
    if (JSON.parse(localStorage.getItem("token")) !== null) {
      dispatch(setUserName(JSON.parse(localStorage.getItem("token")).userName));
      dispatch(setIsLog(JSON.parse(localStorage.getItem("token")).token));
    }
  });
  const { isLog } = useSelector((store) => store.users);
  const isLoading = useSelector((store) => store.isLoading);
  return (
    <div
      className="Login-container"
      style={{ background: Theme[mode].primary, minHeight: "100vh" }}
    >
      
      {isLog && <Navigate to="/home" />}
      {isLoading ? (
        // <Loading />
        <Box
          display={{ xs: "none", sm: "none", md: "flex" }}
          position="absolute"
          bottom={"0"}
          right="0"
          padding={"20px"}
        >
          <img className="spin" src={spin} alt="spin" />
        </Box>
      ) : (
        <Box minHeight={"100vh"} sx={{ background: Theme[mode].primary}}>
              <Nav setLoginType={setLoginType} />
              <Box display="flex">
                <SideBar />
                <Box
            sx={{
              height: "calc(100vh - 64px)",
              width: { xs: "100%", sm: "calc(100% - 80px)" },
              display: "flex",
              flexDirection: "column",
              padding: { xs: "10px", sm: "20px" },
              overflow: "scroll",
            }}
          >
            {loginType === "login" ? (
                  <Box 
                    marginTop={"10rem"}
                    display="flex"
                    justifyContent="center"
                  >
                  <FormLogin
                    form={form}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    handleSubmits={handleSubmits}
                    errors={errors}
                  />
                  </Box>
                ) : (
                  <Box 
                    marginTop={"10rem"}
                    display="flex"
                    justifyContent="center"
                  >
                  <FormRegister
                    form={form}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    handleSubmit={handleSubmit}
                    handleImage={handleImage}
                    image={image}
                    previewUrl={previewUrl}
                    errors={errors}
                  />
                  </Box>
                )}
                <Box
                  marginTop={"1rem"}
                  display="flex"
                  justifyContent="center"
                  className="Login-form-links"
                >
                  {loginType === "login" ? (
                    <Button
                      variant="text"
                      onClick={() => setLoginType("register")}
                      style={{ color: Theme[mode].textPrimary }}
                    >
                      Register
                    </Button>
                  ) : (
                    <Button
                      variant="text"
                      onClick={() => setLoginType("login")}
                      style={{ color: Theme[mode].textPrimary }}
                    >
                      Login
                    </Button>
                  )}
                </Box>
              </Box> 
            </Box>
        </Box>
      )}
    </div>
  );
};
export default Login;
