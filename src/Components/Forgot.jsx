import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Config/Firebase";


function Forgot() {

    const [email,setEmail] = useState("")

const reset = async ()=>{
try {
    await sendPasswordResetEmail(auth,email)
} catch (error) {
    alert(error.code)
}
}

  return (
    <div>
      <Row>
        <Col sm={12} md={2}>
          {" "}
        </Col>
        <Col sm={12} md={4}>
          <div>
            <Link style={{ textDecoration: "none", color: "inherit" }} to={"/"}>
              <p
                className="mt-3 ms-5"
                style={{ color: "red", fontSize: "45px", fontWeight: "bold" }}
              >
                Docs
                <span className="ms-2">
                  <i className="fab fa-dochub"></i>{" "}
                  {/* Changed from class to className */}
                </span>
              </p>
            </Link>
          </div>

          <h2
            className="ms-5"
            style={{
              marginTop: "100px",
              fontWeight: "bold",
              display: "flex",
              flexDirection: "column",
            }}
          >
            Forgot your
            <span>password?</span>
          </h2>

                <div className="ms-5 mt-4" style={{display:"flex",flexDirection:"column"}}>
                <h7 >To reset your password, please enter the email </h7>
                <h7> address of your Docs account.</h7>
                </div>


                <div className="mt-3 ms-5 ">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              placeholder="Enter your Email..."
              required
              style={{ width: "400px" }}
              value={email}
             onChange={(e) => setEmail(e.target.value)}
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
          width: "65%",
          fontWeight: "bold",
          fontSize: "24px",
          marginLeft: "60px",
          height:"70px"
        }}
        className="rounded mt-3"
      >
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={""}
        >
          {" "}
          <p style={{height:"50px"}} onClick={reset}>Reset my password</p>
        </Link>{" "}
      </p>


      <p className="me-5"
      style={{textAlign:"center"}}>
      <Link style={{color:"inherit"}} to={"/login"}>  Go to login</Link>
      </p>

        </Col>
        <Col>
        {/* <img style={{marginTop:"90px"}} src="/Images/s.png" alt="image"/> */}
        </Col>
      </Row>
    </div>
  );
}

export default Forgot;
