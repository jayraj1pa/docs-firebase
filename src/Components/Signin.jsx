import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { TextField } from "@mui/material";
import {  Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup } from "firebase/auth";
import { auth,gprovider,aprovider,fprovider } from "../Config/Firebase";
import { doc, getDoc, onAuthStateChanged } from "firebase/firestore";


function Signin({ register }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userProfile, setUserProfile] = useState(null);

  

  const history = useNavigate()


  const isRegister = register ? true : false;

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(data=>{
        history('/onboard')
      })
    } catch (err) {
      alert(err.code)
    }
};


const handleLogin = async () => {
  try {
   await signInWithEmailAndPassword(auth,email,password).then(data=>{
     history('/onboard')
   })
  } catch (err) {
   alert(err.code)
  }
};

const handleGoogle = async () =>{
  try {
      await signInWithPopup(auth,gprovider).then((data)=>{
        history('/onboard')
      })
  } catch (error) {
    alert(error.code)
  }
}

const handleAplle = async () =>{
  try {
     await signInWithPopup(auth,aprovider).then((data)=>{
      history('/onboard')
     })
  } catch (error) {
    alert(error.code)
  }
}


const handleFacebook = async () =>{
  try {
     await signInWithPopup(auth,fprovider).then((result)=>{
      
  
      history('/onboard')
     })
  } catch (error) {
    alert(error.code)
  }
}

  


  console.log(auth?.currentUser);




  



  return (
    <div>
      <Row className="container-fluid">
        <Col sm={12} md={2}>
          {" "}
        </Col>
        <Col sm={12} md={4}>
          <div>
            <Link style={{ textDecoration: "none", color: "inherit" }} to={"/"}>
              <p
                className="mt-3 ms-5"
                style={{ color: "red", fontSize: "39px", fontWeight: "bold" }}
              >
                Docs
                <span className="ms-2">
                  <i className="fab fa-dochub"></i>{" "}
                  {/* Changed from class to className */}
                </span>
              </p>
            </Link>
          </div>

          <h5
            className=" ms-5"
            style={{
              fontWeight: "bolder",
              fontSize: "28px",
              marginTop: "75px",
            }}
          >
            {isRegister ? "Sign up" : "Log in"}
          </h5>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontWeight: "bolder",
              fontSize: "19px",
              marginLeft: "200px",
              padding: "5px",
              border: "none",
              transition: "background-color 0.3s, border 0.3s", // Adding a smooth transition
            }}
            className="mt-5"
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#d3d3d3"; // Change to your desired ash color
              e.currentTarget.style.border = "1px solid #808080"; // Change to your desired border color
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.border = "none";
            }}
          >
            <i
              class="fab fa-google"
              style={{ color: "#eb3305", marginRight: "25px" }}
            ></i>
            <span onClick={handleGoogle} className="ms-2 ">Continue with Google</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontWeight: "bolder",
              fontSize: "19px",
              marginLeft: "200px",
              padding: "5px",
              border: "none",
              transition: "background-color 0.3s, border 0.3s", // Adding a smooth transition
            }}
            className="mt-3"
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#d3d3d3"; // Change to your desired ash color
              e.currentTarget.style.border = "1px solid #808080"; // Change to your desired border color
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.border = "none";
            }}
          >
            <i
              class="fab fa-apple"
              style={{ color: "#000", marginRight: "0px" }}
            ></i>
            <span onClick={handleAplle} className="ms-4 ">Continue with Apple</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontWeight: "bolder",
              fontSize: "19px",
              marginLeft: "200px",
              padding: "1px",
              border: "none",
              transition: "background-color 0.3s, border 0.3s", // Adding a smooth transition
            }}
            className="mt-3"
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#d3d3d3"; // Change to your desired ash color
              e.currentTarget.style.border = "1px solid #808080"; // Change to your desired border color
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.border = "none";
            }}
          >
            <i
              class="fab fa-facebook rounded-pill"
              style={{
                marginRight: "5px",
                backgroundColor: "#3b5998", // Blue background color
                color: "white",
              }}
            ></i>
            <span onClick={handleFacebook} className="ms-4">Continue with Facebook</span>
          </div>

          <div className="mt-5 ms-5 ">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              placeholder="Enter your Email..."
              required
              style={{ width: "500px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-3 ms-5 ">
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              placeholder="Enter your Password..."
              type="password"
              required
              style={{ width: "500px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <p
        style={{
          border: "20px solid red",
          backgroundColor: "red",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          fontWeight: "bold",
          fontSize: "24px",
          marginLeft: "60px",
        }}
        className="rounded mt-3"
      >
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={""}
        >
          {" "}
          <div onClick={isRegister ? handleSignup : handleLogin}>
            {isRegister ? "Signup with Email" : "Log in"}
          </div>
        </Link>{" "}
      </p>

      <p>
        {
          !isRegister && 
          <div className="ms-5" style={{ textAlign: "left" }} >
            <Link to={"/forgot"}>    Forget password </Link>
              
            </div>
        }
      </p>

          <p style={{fontSize:"18px"}} className="ms-5">
            {" "}
            By continuing with Google, Apple, or Email, you agree to Doc's Terms
            of Service and Privacy Policy.
          </p>

          {isRegister ? (
            <div  style={{ textAlign: "center" ,fontSize:"18px"}}>
              "Already signed up?
              <Link style={{ textDecoration: "none" }} to={"/login"}>
                {" "}
                Go to login
              </Link>
              "
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              "Don’t have an account?{" "}
              <Link style={{ textDecoration: "none" }} to={"/signup"}>
                Sign up"
              </Link>
            </div>
          )}
        </Col>
        <Col sm={12} md={6}>
          <div style={{marginBottom:"20px",marginLeft:"15px"}} className="d-flex justify-content-center align-items-center w-100 h-100">
            <img src="/Images/m.png" alt="image" />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Signin;