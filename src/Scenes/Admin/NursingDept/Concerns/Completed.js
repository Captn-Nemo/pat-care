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
import { useSelector } from "react-redux";

const CompletedConcerns = ({ isRoom = false, roomId = null }) => {
  const NCID = useSelector((state) => state.NCID);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [ID, setId] = useState("");
  const [info, setInfo] = useState(true);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [DID, setDID] = useState(0);
  const [NC, setNC] = useState(0);

  const getApiData = () => {
    let dept = JSON.parse(localStorage.getItem("dept"));
    let NS = JSON.parse(localStorage.getItem("NS"));
    let deptID = dept.value === NCID ? 0 : dept.value;
    let NSID = NS === NCID ? 0 : dept.value;
    let status = 0;
    setLoading("loading...");
    setDID(deptID);
    setNC(NSID);
    setData(null);
    setError(null);
    if (isRoom) {
      axios
        .get(`${BOOKING}/${roomId}`)
        .then((res) => {
          setData(res.data);
          setLoading(null);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(null);
        });
    } else {
      axios
        .get(`${BOOKING}/${deptID}/${NSID}/${status}`)
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

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (formdata) => {
    console.log(formdata);
    // AddNursingStation(formdata);
  };
  const {
    response: postData,
    error: postError,
    loading: postLoading,
    apiRqst,
  } = useAxios();

  const changeToEditMode = (rowData) => {
    setEditMode(true);
    setId(rowData.Id);
    setValue("code", rowData.Code);
    setValue("name", rowData.Name);
    setValue("notes", rowData.Notes);
    setOpen(true);
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
              columns={CONCERNS_TABLE}
              data={data}
              onDeleteClick={() => alert("Delete")}
              onEditClick={changeToEditMode}
              onRefresh={getApiData}
              title="Completed"
              url={BOOKING}
              disableActions
              forwardButton={DID == 0 ? true : false}
              forwardToStation={() => setOpen(true)}
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
          <StationToStation />
        </Modal.Body>
      </Modal>
      {rendertable()}
    </>
  );
};

export default CompletedConcerns;
