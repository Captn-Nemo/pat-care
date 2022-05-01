import React, { useState, useEffect } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import Card from "../../App/components/MainCard";
import Home from "./Home";

const Dashboard = () => {
  const [userdata, setUserData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const data = {
    patientName: "sajtih",
    uhid: "12345",
    ipNo: "1234",
  };

  const loadData = () => {
    setTimeout(() => {
      let user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      setUserData(user);
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Row className="justify-content-md-center">
        <Col>
          <Row className="justify-content-md-center">
            <Col md={4} xl={4}>
              <Card title="Patient Details">
                {isLoading ? (
                  <Spinner
                    animation="border"
                    variant="secondary"
                    className="mx-auto"
                  />
                ) : (
                  <>
                    <p>Patient name: {userdata.PatientName}</p>
                    <p>UHID : {userdata.Uhid}</p>
                    <p>IP No : {userdata.IpNo}</p>
                  </>
                )}
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md={10} xl={10}>
              <Card title="Our Services">
                <Home />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
