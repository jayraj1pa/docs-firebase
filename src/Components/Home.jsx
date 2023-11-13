import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center me-5 ms-5">
        <p style={{ color: "red", fontSize: "30px" }}>
          Docs{" "}
          <span>
            <i class="fa-brands fa-dochub"></i>
          </span>{" "}
        </p>

        <div className="d-flex mt-3">
          <p
            className="me-5 mt-3 "
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              fontFamily: "sans-serif",
            }}
          >
            <Link style={{textDecoration:"none",color:"inherit"}} to={"/login"}>Login</Link>
          </p>

              <div>
              <Link style={{textDecoration:"none",color:"inherit"}} to={"/signup"}>
              <p
            style={{
              border: "14px solid red",
              backgroundColor: "red",
              color: "white",
              fontWeight: "bold",
            }}
            className="rounded-pill "
          >
             Start for free
          </p>
              </Link>
              </div>

         
        </div>
      </div>

      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "55vh",
          fontSize: "50px",
          fontWeight: "bolder",
          flexDirection: "column",
        }}
      >
        <div>
          <p style={{ marginLeft: "50px" }}>Organize work and life</p>
          <p style={{ marginTop: "-30px" }}>seamlessly on our platform.</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "-100px",
          fontSize: "19px",
          fontFamily: "cursive",
          color: "#808080",
          textRendering: "optimizeLegibility", // Enhances the sharpness
        }}
      >
        <p style={{ margin: "0px" }}>
          "Achieve clarity, productivity, and tranquility with Docs{" "}
        </p>
        <p style={{ margin: "0px" }}>
          - Your premier task manager and document organizer app for a
          streamlined life".
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
       
       <div>
       <Link style={{textDecoration:"none",color:"inherit"}} to={"/onboards"}> 

       <p
          style={{
            border: "14px solid red",
            backgroundColor: "red",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%", // You can adjust this value as needed
            fontWeight: "bold",
            fontSize: "24px",
          }}
          className="rounded mt-5"
        >
          Guest Login
        </p>

       </Link>
       </div>
       
      </div>
    </div>
  );
}

export default Home;
