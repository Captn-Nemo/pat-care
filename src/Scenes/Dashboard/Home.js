import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col, Button, Modal, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import RetryButton from "../../App/components/RetryButton";
import { DEPARTMENTS } from "../../configs/apiRoutes";
import Booking from "./Booking";

import "./style.css";
const image = require("../../assets/images/emergency.png");

const FandB = 26;

const Home = () => {
  const [modal, setModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const history = useHistory();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const getApiData = () => {
    setData(null);
    setError(null);
    Axios.get(DEPARTMENTS)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError("An error occurred. Awkward..");
      });
  };
  useEffect(() => {
    getApiData();
  }, []);

  function renderCards() {
    if (error) {
      return <RetryButton retryFn={getApiData} />;
    }
    if (data?.length == 0) {
      return <h4 className="text-success">No Data Found </h4>;
    } else if (data?.length > 0) {
      console.log("inside");
      return (
        <Row className="justify-content-md-center">
          <Col md={12} xl={21}>
            <Row className="justify-content-md-center">
              {data.map((link, i) => {
                return (
                  <Col key={i} md={4} xl={4}>
                    <Card
                      className="button-card"
                      onClick={() => {
                        setSelectedCategory(link);
                        link.Id === FandB
                          ? history.push("/app/orderfood")
                          : setModal(true);
                      }}
                    >
                      <Card.Body className="p-2">
                        <div className="d-flex flex-row align-items-center">
                          <div>
                            <Card.Img src={image} className="img-thumb" />
                          </div>
                          <div className="ml-3">
                            <h5 className="text-black text-center">
                              {link.Name}
                            </h5>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      );
    }
  }

  return (
    <div>
      <Modal centered show={modal} onHide={() => setModal(false)} size="lg">
        <Modal.Body>
          <Booking
            onCancel={() => setModal(false)}
            category={selectedCategory}
            data={data}
          />
        </Modal.Body>
      </Modal>
      {renderCards()}
    </div>
  );
};

export default Home;
