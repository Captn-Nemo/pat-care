import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card, Tabs, Tab, Spinner } from "react-bootstrap";
import AnimatedModal from "../../App/components/AnimatedModal";
import CustomResponseMessage from "../../App/components/CustomResponseMessage";
import Emoji from "../../App/components/Emoji";
import { BOOKING, CHECKOUT } from "../../configs/apiRoutes";
import { useAxios } from "../../configs/useAxios";
import { RESPONSETYPES } from "../../constants";
import MyOrderstable from "../Tables/MyOrderstable";
import CompletedConcerns from "../Admin/NursingDept/Concerns/Completed";
import RetryButton from "../../App/components/RetryButton";
import { CONCERNS_TABLE } from "../../configs/tableConfigs";
import TableGenerator from "../../App/components/TableGenerator";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const MyOrders = () => {
  const [modal, setModal] = useState(false);
  const [vote, setVote] = useState(5);
  const [info, setInfo] = useState(true);
  const [selected, setSelected] = useState(5);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  const byStanderId = JSON.parse(localStorage.getItem("byStanderId"));
  const useriD = 0;
  console.log(user, byStanderId);

  const getApiData = () => {
    Axios.get(`${BOOKING}/${byStanderId}/${useriD}/`)
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError("An error occurred. Awkward..");
      });
  };
  useEffect(() => {
    getApiData();
  }, []);

  const {
    response: postData,
    error: postError,
    loading: postLoading,
    apiRqst,
  } = useAxios();

  //Rendering the Table based on the Data from API
  function rendertable() {
    if (error) {
      return <RetryButton retryFn={getApiData} />;
    }
    if (data?.length == 0) {
      return <h4 className="text-success">No orders </h4>;
    } else if (data?.length > 0) {
      return (
        <Row>
          <Col>
            <TableGenerator
              customPage={5}
              columns={CONCERNS_TABLE}
              data={data}
              onDeleteClick={() => alert("Delete")}
              onRefresh={getApiData}
              title="Completed"
              url={BOOKING}
              disableActions
              forwardButton={false}
              // forwardToStation={() => setOpen(true)}
            />
          </Col>
        </Row>
      );
    } else {
      return (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="info" />;
        </div>
      );
    }
  }

  const Checkout = () => {
    setInfo(true);
    const body = { id: user.Id, InOrOut: 1, Vote: vote };
    console.log(body);
    apiRqst({
      method: "PUT",
      url: CHECKOUT,
      data: body,
    })
      .then(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("byStanderId");
        localStorage.removeItem("isAuthed");
        alert("Successfully checked out");
        setTimeout(() => {
          setInfo(false);
        }, 2000);
        setModal(false);
        history.push("/");
      })
      .catch(() => {
        alert("Errr checking out");
        setTimeout(() => {
          setInfo(false);
        }, 2000);
        setModal(false);
      });
  };

  return (
    <>
      {/* ----------------------------------------- Emoji Modal -------------------------------------*/}
      <AnimatedModal
        animation={"bounceIn"}
        showModal={modal}
        modalClosed={() => {
          setModal(false);
          setInfo(false);
        }}
      >
        {info && postData ? (
          <CustomResponseMessage type={RESPONSETYPES.SUCCESS} msg={postData} />
        ) : null}
        {info && postError ? (
          <CustomResponseMessage type={RESPONSETYPES.ERROR} />
        ) : null}

        <Card>
          <Card.Header as="h5" className="theme-bg2">
            Give Your Feedback
          </Card.Header>
          <Card.Body>
            <Row>
              <Col
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Emoji
                  symbol="😄"
                  label="5"
                  value={5}
                  vote={setVote}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Emoji
                  symbol="🙂"
                  label="4"
                  value={4}
                  vote={setVote}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Emoji
                  symbol="😐"
                  label="3"
                  value={3}
                  vote={setVote}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Emoji
                  symbol="🙁"
                  label="2"
                  value={2}
                  vote={setVote}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Emoji
                  symbol="😡"
                  label="1"
                  value={1}
                  vote={setVote}
                  selected={selected}
                  setSelected={setSelected}
                />
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer className="text-center">
            <button
              disabled={postLoading}
              onClick={() => {
                Checkout();
              }}
              className="btn btn-theme2 md-close"
            >
              Submit and Checkout
            </button>
          </Card.Footer>
        </Card>
      </AnimatedModal>
      {/*----------------------------- Checkout Modal End ------------------------------------- */}
      {/* <Row className="justify-content-md-center">
        <Col md={10} xl={10}> */}
      <Tabs variant="pills" defaultActiveKey="pending" className="mb-3">
        <Tab eventKey="pending" title="Pending Concenrs">
          {rendertable()}
        </Tab>
        <Tab eventKey="completed" title="Completed Concerns" className="myTab">
          {rendertable()}
        </Tab>
      </Tabs>
      {/* </Col>
      </Row> */}
      <Row className="justify-content-md-center mt-3">
        <Col md={6}>
          <Button
            className="shadow-5"
            block
            variant="primary"
            onClick={() => setModal(true)}
          >
            Vote and Checkout
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default MyOrders;
