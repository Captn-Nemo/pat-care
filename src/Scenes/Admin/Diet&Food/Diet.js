import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
  Table,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import ErrorText from "../../../App/components/ErrorText";
import RetryButton from "../../../App/components/RetryButton";
import { DIET_HEADER } from "../../../configs/apiRoutes";
import { useAxios } from "../../../configs/useAxios";
import { DIET_HEADER_TABLE } from "../../../configs/tableConfigs";
import axios from "axios";
import CustomResponseMessage from "../../../App/components/CustomResponseMessage";
import { DINING_TIMES, RESPONSETYPES } from "../../../constants";
import TableGenerator from "../../../App/components/TableGenerator";
import Select from "react-select";
import { getStation } from "../../../configs/helpers";
import AddDiet from "./AddDiet";
const Diet = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [diet, setDiet] = useState({});
  const [ID, setId] = useState("");
  const [info, setInfo] = useState(true);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const getApiData = () => {
    setLoading("loading...");
    setData(null);
    setError(null);
    axios
      .get(DIET_HEADER)
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

  const clearOutFn = () => {
    setInfo(false);
    setEditMode(false);
    setOpen(false);
    setValue("name", "");
    setValue("code", "");
    setValue("diningTime", "");
    clearErrors();
  };

  const {
    response: postData,
    error: postError,
    loading: postLoading,
    apiRqst,
  } = useAxios();

  const AddNewCategory = (apiData) => {
    console.log(apiData);
    setInfo(true);
    if (editMode) {
      const body = { ...apiData, Id: ID };
      apiRqst({
        method: "PUT",
        url: DIET_HEADER,
        data: body,
      }).then(() => {
        getApiData();
      });
    } else {
      const body = { ...apiData };
      apiRqst({
        method: "POST",
        url: DIET_HEADER,
        data: body,
      }).then(() => {
        getApiData();
      });
    }
  };

  const onSubmit = (formdata) => {
    console.log(formdata);
    // AddNewCategory(formdata);
  };

  const changeToEditMode = (rowData) => {
    console.log(rowData);
    setDiet(rowData);
    setEditMode(true);
    setId(rowData.Id);
    setOpen(true);
  };

  //Rendering the Table based on the Data from API
  function rendertable() {
    if (error) {
      return <RetryButton retryFn={getApiData} />;
    }
    if (data?.length > 0) {
      return (
        <Row>
          <Col>
            <TableGenerator
              columns={DIET_HEADER_TABLE}
              data={data}
              onDeleteClick={() => alert("Delete")}
              onEditClick={changeToEditMode}
              onRefresh={getApiData}
              title="Available Diets"
              url={DIET_HEADER}
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
      <Modal centered show={open} onHide={() => clearOutFn()} size="lg">
        {info && postData ? (
          <CustomResponseMessage type={RESPONSETYPES.SUCCESS} msg={postData} />
        ) : null}
        {info && postError ? (
          <CustomResponseMessage type={RESPONSETYPES.ERROR} />
        ) : null}
        <Modal.Body>
          <Card>
            <Card.Header className="mb-4">
              <Card.Title as="h5">
                {" "}
                {editMode ? "Update Diet" : "Add Diet"}
              </Card.Title>
            </Card.Header>
            <AddDiet editMode={editMode} diet={diet} />
          </Card>
        </Modal.Body>
      </Modal>
      <Row className="mb-3">
        <Col>
          <Button onClick={() => setOpen(true)}>
            <i className="feather icon-plus" />
            Add Diet
          </Button>
        </Col>
      </Row>
      {rendertable()}
    </>
  );
};

export default Diet;
