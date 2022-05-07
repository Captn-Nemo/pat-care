import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button, Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ErrorText from "../../../../App/components/ErrorText";
import RetryButton from "../../../../App/components/RetryButton";
import { BOOKING } from "../../../../configs/apiRoutes";
import { useAxios } from "../../../../configs/useAxios";
import { CONCERNS_TABLE } from "../../../../configs/tableConfigs";
import TableGenerator from "../../../../App/components/TableGenerator";
import axios from "axios";
import StationToStation from "../StationToStation";
import AllotTime from "../AllotTime";
import { useSelector } from "react-redux";

const PendingConcerns = ({ isRoom = false, roomId = null }) => {
  const { NCID, NS_DEPT, LAB_DEPT } = useSelector((state) => state);

  const dept = JSON.parse(localStorage.getItem("dept"));
  const NS = JSON.parse(localStorage.getItem("NS"));
  console.log(NS);
  const [open, setOpen] = useState(false);
  const [timeModal, setTimeModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [Tloading, setTLoading] = useState(null);
  const [error, setError] = useState(null);
  const [DID, setDID] = useState(0);
  const [NC, setNC] = useState(0);
  const [bookingData, setBookingData] = useState(null);

  const getApiData = () => {
    let deptID = dept.value == NS_DEPT ? 0 : dept.value;
    let NSID = deptID == 0 ? NS.value : 0;
    let status = 0;
    let dummy = 0;
    setLoading(true);
    setDID(deptID);
    setNC(NSID);
    setData(null);
    setError(null);
    if (isRoom) {
      axios
        .get(`${BOOKING}/${roomId}/${status}`)
        .then((res) => {
          setData(res.data);
          setLoading(null);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      axios
        .get(`${BOOKING}/${deptID}/${NSID}/${status}/${dummy}`)
        .then((res) => {
          setLoading(false);
          setData(res.data);
        })
        .catch((err) => {
          setLoading(false);
          setError("An error occurred. Awkward..");
        });
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const triggerForward = (rowData) => {
    setBookingData(rowData);
    setOpen(true);
  };

  const allotTimeFn = (rowData) => {
    setTimeModal(true);
    setRowData(rowData);
  };

  const changeStatus = (rowData) => {
    console.log(rowData);
    let status = 1;
    let dummy = 0;
    setTLoading(true);
    axios
      .put(`${BOOKING}/${rowData.Id}/${status}/${dummy}`)
      .then((res) => {
        setTLoading(false);
        getApiData();
      })
      .catch((err) => {
        setTLoading(false);
        alert("An error occurred. Awkward..");
      });
  };

  //Rendering the Table based on the Data from API
  function rendertable() {
    if (error) {
      return <RetryButton retryFn={getApiData} />;
    }
    if (data?.length == 0) {
      return <h4 className="text-success">No Concerns </h4>;
    } else if (data?.length > 0) {
      return (
        <Row>
          <Col>
            <TableGenerator
              statusButton={true}
              isLoading={Tloading}
              columns={CONCERNS_TABLE}
              data={data}
              onDeleteClick={() => alert("Delete")}
              // onEditClick={changeToEditMode}
              changeStatus={changeStatus}
              onRefresh={getApiData}
              title="Pending Concerns"
              url={BOOKING}
              disableActions
              allotTime={dept.value == LAB_DEPT ? true : false}
              allotTimeFn={allotTimeFn}
              forwardButton={DID == 0 ? true : false}
              forwardToStation={triggerForward}
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

  return (
    <>
      <Modal
        centered
        show={open}
        onHide={() => {
          setOpen(false);
        }}
        size="lg"
      >
        <Modal.Body>
          <StationToStation
            booking={bookingData}
            stationId={NS}
            getApiData={getApiData}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </Modal.Body>
      </Modal>
      <Modal
        centered
        show={timeModal}
        onHide={() => {
          setTimeModal(false);
        }}
        size="lg"
      >
        <Modal.Body>
          <AllotTime
            rowData={rowData}
            onCancel={setTimeModal}
            getApiData={getApiData}
          />
        </Modal.Body>
      </Modal>
      {rendertable()}
    </>
  );
};

export default PendingConcerns;
