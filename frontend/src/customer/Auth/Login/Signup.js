import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "lightgreen",
  border: "2px solid #000",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};
const Signup = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [apiResult, setApiResult] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const SuccessCard = () => {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Account Created Successfully.
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  };

  const handleSubmitSignup = async () => {
    await axios
      .post("http://localhost:3535/auth/signup", formik.values)
      .then((res) => {
        console.log(res);
        function nav() {}
        if (res.status === 200) {
          handleOpen();
          const wait = setTimeout(() => {
            console.log("navigate");
            navigate("/");
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 500) setApiResult(err.response.data.error);
      });
    // navigate("/login");
  };
  console.log(apiResult);

  const basicSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().email("Please enter valid email").required("Required"),
    password: yup
      .string()
      .required("Required")
      .min(8, "Password must be 8 characters.")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter ")
      .matches(/[A-Z]/, "Password requires a uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password does not match")
      .required("Please re-type your password"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: handleSubmitSignup,
    validationSchema: basicSchema,
  });

  return (
    <div className="loginParent">
      <div class="box">
        <div class="container">
          <div class="shape1"></div>
          <div class="shape2"></div>

          <div className="card w-96">
            <div className="  flex flex-col items-center justify-center  mt-3">
              <SupervisedUserCircleIcon
                sx={{
                  width: "80px",
                  height: "80px",
                  color: "white",
                }}
              />
              <h1 className=" text-lg font-bold text-white">
                Create your account
              </h1>
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
                  id="firstName"
                  name="firstName"
                  label="First name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.firstName && formik.touched.firstName}
                />
                {formik.errors.firstName && formik.touched.firstName && (
                  <span className="text-red-600">
                    {formik.errors.firstName}
                  </span>
                )}
                <TextField
                  inputProps={{
                    style: {
                      color: "white",
                    },
                  }}
                  fullWidth
                  multiline
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.lastName && formik.touched.lastName}
                />
                {formik.errors.lastName && formik.touched.lastName && (
                  <span className="text-red-600">{formik.errors.lastName}</span>
                )}

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
                <FormControl fullWidth sx={{}} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Confirm password
                  </InputLabel>
                  <OutlinedInput
                    inputProps={{
                      style: {
                        color: "white",
                      },
                    }}
                    name="confirmPassword"
                    label="Confirm password"
                    id="outlined-adornment-password confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.errors.confirmPassword &&
                      formik.touched.confirmPassword
                    }
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
                {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword && (
                    <span className="text-red-600">
                      {formik.errors.confirmPassword}
                    </span>
                  )}

                <CardActions className=" flex justify-center">
                  <Button
                    sx={{
                      color: "white",
                      marginBottom: "50px",
                      ":hover": {
                        bgcolor: "white",
                        color: "black",
                      },
                    }}
                    size="large"
                    onClick={() => navigate("/")}
                  >
                    Login
                  </Button>
                  <Button
                    className="btn"
                    sx={{
                      color: "white",

                      marginBottom: "50px",
                      ":hover": {
                        bgcolor: "white",
                        color: "black",
                      },
                    }}
                    size="large"
                    type="submit"
                  >
                    Create
                  </Button>
                </CardActions>
              </form>
            </CardContent>
          </div>
        </div>
      </div>
      <SuccessCard />
    </div>
  );
};

export default Signup;
