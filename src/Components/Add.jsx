import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { auth } from "../Config/Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TextField } from "@mui/material";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { dbStore } from "../Config/Firebase";
import { useEffect } from "react";
import { Col, Row, Card } from "react-bootstrap";

function MyVerticallyCenteredModal(props) {
  const [inputCh, setInputCh] = useState("");
  // const [userId,setUserid] = useState("")

  const channelCollection = collection(dbStore, "youtube");
  const userId = auth.currentUser?.uid;

  const handleAdd = async () => {
    await addDoc(channelCollection, {
      name: inputCh,
      createdBy: userId,

    });

    // Update inputCh in NavScrollExample
    // props.setInputCh(inputCh);

    props.getChannels();
    setInputCh("");
    props.setModalShow();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          {" "}
          <Modal.Title id="contained-modal-title-vcenter">
            ADD TO Doc's
          </Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <TextField
            style={{ width: "100%" }}
            id="standard-basic"
            label="Topic"
            variant="standard"
            value={inputCh}
            onChange={(e) => setInputCh(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleAdd}>Add</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function NavScrollExample({ signup }) {
  // search
  const [searchInput, setsearchInput] = useState("");

  const [modalShow, setModalShow] = useState(false);
  const [color, setColor] = useState();
  const [colorCheck, setColorCheck] = useState(false);
  //   const [inputCh, setInputCh] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [editingChannelId, setEditingChannelId] = useState(null);

  const history = useNavigate();

  const channelCollection = collection(dbStore, "youtube");

  const [channels, setChannels] = useState([]);

  const isSignup = signup ? true : false;

  const filterdata = channels.filter((channel) =>
    channel.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const getChannels = async () => {
    try {
      const data = await getDocs(channelCollection);
      const filterdata = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setChannels(filterdata);
    } catch (error) {
      console.error("Error fetching channels:", error);
    }
  };

  useEffect(() => {
    getChannels();
  }, []);

  const changeColor = (bgcolor) => {
    console.log("Changing color to", bgcolor);
    setColor(bgcolor);
    setColorCheck((prevColorCheck) => !prevColorCheck); // Toggle between true and false
  };

  const logout = async () => {
    try {
      signOut(auth).then((val) => {
        history("/login", { replace: true }); // Redirects the user to the login page
      });
    } catch (error) {
      alert(error.code);
    }
  };

  const handleDelete = async (id) => {
    const channeldoc = doc(dbStore, "youtube", id);
    deleteDoc(channeldoc);
    getChannels();
  };

  const handleEdit = async (id) => {
    if (editingChannelId === id) {
      const channeldoc = doc(dbStore, "youtube", id);
      await updateDoc(channeldoc, {
        name: editValue,
      });
      getChannels();
      setEditingChannelId(null);
    } else {
      setEditingChannelId(id);
      // Set the initial value when starting to edit
      const channelToEdit = channels.find((ch) => ch.id === id);
      setEditValue(channelToEdit ? channelToEdit.name : "");
    }
  };

  console.log(isSignup);

  return (
    <div style={{ backgroundColor: color || "white", minHeight: "1000vh" }}>
      <div
        style={
          colorCheck
            ? { backgroundColor: color }
            : { backgroundColor: "#DC4C3E" }
        }
      >
        <Navbar expand="lg" className="bg-body-tertiary me-5 ms-5 ">
          <Container fluid>
            <Navbar.Brand href="#">
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={isSignup ? "/" : "/onboard"}
              >
                <i class="fa-solid fa-house" style={{ color: "#f7f9fd" }}></i>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Form className="d-flex" style={{ height: "40px" }}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchInput}
                    onChange={(e) => setsearchInput(e.target.value)}
                  />
                </Form>
              </Nav>
              <div
                onClick={() => setModalShow(true)}
                style={{
                  color: "white",
                  backgroundColor: "#E37065",
                  border: "none",
                  fontWeight: "bold",
                }}
                className="me-5 rounded p-2"
              >
                ADD
              </div>

              <div style={{ color: "white" }} className="me-4">
                {colorCheck ? (
                  <span onClick={() => changeColor("white")}>
                    <i className="fa-solid fa-sun fa-xl"></i>{" "}
                  </span>
                ) : (
                  <span onClick={() => changeColor("#333333")}>
                    <i className="fa-solid fa-moon fa-xl"></i>{" "}
                  </span>
                )}
              </div>

              <div>
                {isSignup ? (
                  <button
                    className="rounded p-2"
                    style={{
                      backgroundColor: "#E37065",
                      border: "none",
                      color: "white",
                      fontWeight: "bold",
                    }}
                    onClick={logout}
                  >
                    Login
                  </button>
                ) : (
                  <button
                    className="rounded p-2"
                    style={{
                      backgroundColor: "#E37065",
                      border: "none",
                      color: "white",
                      fontWeight: "bold",
                    }}
                    onClick={logout}
                  >
                    Logout
                  </button>
                )}
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          getChannels={getChannels}
          setModalShow={setModalShow}
          //   setInputCh={setInputCh}
        />
      </div>

      <Row style={{ marginLeft: "125px", marginTop: "25px" }}>
        {filterdata.map((ch) => (
          <Col sm={12} md={4} key={ch.id}>
            <Card style={{ padding: "5px", margin: "50px", width: "400px" }}>
              <Card.Body>
                <Card.Text>
                  <div className="d-flex justify-content-between align-items-center w-100">
                    {editingChannelId === ch.id ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                      />
                    ) : (
                      ch.name
                    )}
                    <div className="d-flex justify-content-end align-items-center w-100">
                      <button
                        className="btn btn-danger me-4"
                        onClick={() => handleDelete(ch.id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      {editingChannelId === ch.id ? (
                        <button
                          className="btn btn-success"
                          onClick={() => handleEdit(ch.id)}
                        >
                          <i className="fa-solid fa-check"></i>
                        </button>
                      ) : (
                        <button
                          className="btn btn-warning"
                          onClick={() => handleEdit(ch.id)}
                        >
                          <i className="fa-solid fa-pencil"></i>
                        </button>
                      )}
                    </div>
                  </div>
                  <hr
                    style={{
                      height: "2px",
                      border: "none",
                      backgroundColor: "black",
                    }}
                  ></hr>
                  {/* <Link to={"/quil"}></Link>
                  <Quil productId={ch.id} /> */}
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to={`/quil/${ch.id}`}
                  >
                    <Button className="btn btn-success d-flex justify-content-center w-100">
                      <i className="fa-solid fa-feather"></i>
                    </Button>
                  </Link>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default NavScrollExample;
