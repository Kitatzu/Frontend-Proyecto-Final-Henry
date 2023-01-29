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
    } = useForm(initialForm, validationsForm);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem("token")));
        if (JSON.parse(localStorage.getItem("token")) !== null) {
            dispatch(setUserName(JSON.parse(localStorage.getItem("token")).userName));
            dispatch(setIsLog(JSON.parse(localStorage.getItem("token")).token));
        }
    });
    const isLog = useSelector((store) => store.isLog);
    const isLoading = useSelector((store) => store.isLoading);
    return (
        <div
            className="Login-container"
            style={{ background: Theme[mode].primary,minHeight: "100vh" }}
        >
            
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
                <>
                    <Grid2 container spacing={2}>
                        <Grid2 xs={12}>
                            <Nav setLoginType={setLoginType} />
                        </Grid2>
                        <Grid2
                            xs={12}
                            sm={6}
                            xl={6}
                            display="flex"
                            flexDirection="column"
                            justifyContent="flex-start"
                            alignItems="center"
                            style={{ background: "none" }}
                        >
                            <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="flex-start"
                                alignItems="center"
                                style={{ background: "none" }}
                                className="Form-aligned"
                            >
                                {loginType === "login" ? (
                                    <FormLogin
                                        form={form}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        handleSubmits={handleSubmits}
                                        errors={errors}
                                    />
                                ) : (
                                    <FormRegister
                                        form={form}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        handleSubmit={handleSubmit}
                                        errors={errors}
                                    />
                                )}
                                <Box
                                    display="flex"
                                    justifyContent="space-around"
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
                        </Grid2>
                        {/* <Grid2 xs={6} sm={6} xl={6} className="Image-display">
                            <img src={Presentation} alt="Natural gift" />
                        </Grid2> */}
          </Grid2>
          {/* <WavesLogin /> */}
        </>
      )}
    </div>
  );
};
export default Login;
