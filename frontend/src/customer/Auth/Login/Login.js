import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Cookies from "js-cookie";
import ReCAPTCHA from "react-google-recaptcha";

import {
  Button,
  CardActions,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

import "./Login.css";
import { red } from "@mui/material/colors";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [apiResult, setApiResult] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const siteKey = "6LdJDAEpAAAAACYd0uQK-lsy0z7S-vih5_2VEzdn";

  const captchaRef = useRef();

  const onCaptchaChange = (value) => {
    setCaptchaValue(value);
  };
  console.log(captchaValue);

  const handleSubmitLogin = async () => {
    captchaRef.current.reset();

    await axios
      .post("http://localhost:3535/auth/signin", {
        ...formik.values,
        captchaValue,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          const jwtToken = res.data.jwt;
          Cookies.set("jwtToken", jwtToken);
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);

        if (err.response.status === 400)
          setApiResult(err.response.data.message);
      });
  };
  console.log(apiResult);

  // useEffect(() => {
  //   handleSubmitLogin();
  // },[])

  const basicSchema = yup.object().shape({
    email: yup.string().email("Please enter valid email").required("Required"),
    password: yup.string().required("Required"),
    // .min(8, "Password must be 8 characters.")
    // .matches(/[0-9]/, "Password requires a number")
    // .matches(/[a-z]/, "Password requires a lowercase letter ")
    // .matches(/[A-Z]/, "Password requires a uppercase letter")
    // .matches(/[^\w]/, "Password requires a symbol"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSubmitLogin,
    validationSchema: basicSchema,
  });

  return (
    <div className="loginParent">
      <div class="box">
        <div class="container">
          <div class="shape1"></div>
          <div class="shape2"></div>

          <div className="card w-96">
            <div className=" flex flex-col items-center justify-center mt-3">
              <SupervisedUserCircleIcon
                sx={{ width: "80px", height: "80px", color: "white" }}
              />
              <h1 className=" text-lg font-bold text-white">Login</h1>
              <p className=" text-red-600">{apiResult}</p>
            </div>
            <CardContent>
              <form onSubmit={formik.handleSubmit} className="space-y-3">
                <TextField
                  inputProps={{
                    style: {
                      color: "white",
                    },
                  }}
                  fullWidth
                  multiline
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.email && formik.touched.email}
                />
                {formik.errors.email && formik.touched.email && (
                  <span className="text-red-600">{formik.errors.email}</span>
                )}
                <FormControl fullWidth sx={{}} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    inputProps={{
                      style: {
                        color: "white",
                      },
                    }}
                    name="password"
                    label="Password"
                    id="outlined-adornment-password password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.password && formik.touched.password}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff style={{ color: "white" }} />
                          ) : (
                            <Visibility style={{ color: "white" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {formik.errors.password && formik.touched.password && (
                  <span className="text-red-600">{formik.errors.password}</span>
                )}
                <div>
                  <ReCAPTCHA
                    sitekey={siteKey}
                    onChange={onCaptchaChange}
                    ref={captchaRef}
                  />
                </div>

                <CardActions className=" flex justify-center">
                  <Button
                    sx={{
                      color: "white",
                      ":hover": {
                        bgcolor: "white",
                        color: "black",
                      },
                    }}
                    size="large"
                    type="submit"
                  >
                    Login
                  </Button>
                  <Button
                    className="btn"
                    sx={{
                      color: "white",
                      ":hover": {
                        bgcolor: "white",
                        color: "black",
                      },
                    }}
                    size="large"
                    onClick={() => navigate("/signup")}
                  >
                    Sign UP
                  </Button>
                </CardActions>
              </form>
            </CardContent>
          </div>
        </div>
      </div>
    </div>
    // <div className="loginParent h-screen  flex justify-center items-center">
    //   <div className="shape1"><button>ewdasfgchbnv</button></div>
    // <div className="shape2"></div>
    //   <Card className="card w-96"  style={ { backgroundColor:"" }} >
    //     <div className=" flex flex-col items-center justify-center mt-3">
    //       <SupervisedUserCircleIcon sx={{ width: "80px", height: "80px" }} />
    //       <h1 className=" text-lg font-bold">Login</h1>
    //       <p className=" text-red-600">{apiResult}</p>
    //     </div>
    //     <CardContent>
    //       <form onSubmit={formik.handleSubmit} className="space-y-3">
    //         <TextField
    //           fullWidth
    //           multiline
    //           id="email"
    //           name="email"
    //           label="Email"
    //           value={formik.values.email}
    //           onChange={formik.handleChange}
    //           onBlur={formik.handleBlur}
    //             error={formik.errors.email && formik.touched.email}
    //         />
    //         {formik.errors.email && formik.touched.email &&<span>{formik.errors.email}</span>}
    //         <FormControl fullWidth sx={{}} variant="outlined">
    //           <InputLabel htmlFor="outlined-adornment-password">
    //             Password
    //           </InputLabel>
    //           <OutlinedInput
    //             name="password"
    //             label="Password"
    //             id="outlined-adornment-password password"
    //             value={formik.values.password}
    //             onChange={formik.handleChange}
    //             onBlur={formik.handleBlur}
    //             error={formik.errors.password && formik.touched.password}
    //             type={showPassword ? "text" : "password"}
    //             endAdornment={
    //               <InputAdornment position="end">
    //                 <IconButton
    //                   aria-label="toggle password visibility"
    //                   onClick={handleClickShowPassword}
    //                   onMouseDown={handleMouseDownPassword}
    //                   edge="end"
    //                 >
    //                   {showPassword ? <VisibilityOff /> : <Visibility />}
    //                 </IconButton>
    //               </InputAdornment>
    //             }
    //           />
    //         </FormControl>
    //         {formik.errors.email && formik.touched.email &&<span>{formik.errors.email}</span>}

    //         <CardActions className=" flex justify-center">
    //           <Button className="btn" size="small" type="submit">
    //             Login
    //           </Button>
    //           <Button className="btn" size="small" onClick={() => navigate("/signup")}>
    //             Sign UP
    //           </Button>
    //         </CardActions>
    //       </form>
    //     </CardContent>
    //   </Card>
    // </div>
  );
};

export default Login;
