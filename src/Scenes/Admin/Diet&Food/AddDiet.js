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
import CustomResponseMessage from "../../../App/components/CustomResponseMessage";
import { DINING_TIMES, RESPONSETYPES } from "../../../constants";
import { useAxios } from "../../../configs/useAxios";
import Select from "react-select";
import FoodList from "../../Dashboard/FoodList";
import Axios from "axios";
import { DIET_DETAILS, DIET_HEADER } from "../../../configs/apiRoutes";

const AddDiet = ({ editMode = false, diet = {} }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [modal, setModal] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const [diningTime, setDiningTime] = useState("");
  const [headerId, setHeaderId] = useState(0);
  const [info, setInfo] = useState(true);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const {
    response: postData,
    error: postError,
    loading: postLoading,
    apiRqst,
  } = useAxios();

  function convertData(data) {
    return data.map((item) => {
      return {
        itemId: item.ItemId,
        itemName: item.ItemName,
        description: "",
        checked: true,
      };
    });
  }

  const updateFormFields = () => {
    setValue("code", diet.Code);
    setValue("name", diet.Name);
    setValue("diningTime", diet.DiningTime);
  };
  useEffect(() => {
    setLoading(true);
    updateFormFields();
    if (editMode) {
      setHeaderId(diet.Id);
      Axios.get(`${DIET_DETAILS}/${diet.Id}/HeaderId`)
        .then((res) => {
          console.log(res.data);
          let data = convertData(res.data);
          setFoodItems(data);
          setHeaderId(diet.Id);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(true);
          setErrMsg("An error occurred. Awkward..");
        });
    }
  }, []);

  const getDinignTime = (id) => {
    // let diningTime = getValues("diningTime");
    let dn = DINING_TIMES.filter((d) => d.value == id);
    console.log(dn);
    return dn[0];
  };

  function make_api_call(header, foodId) {
    let body = {
      dietHeaderId: header,
      itemId: foodId,
    };
    console.log(body);
    // return body;
    if (editMode) {
      console.log("inside edit mode");
      return Axios.put(DIET_DETAILS, body);
    } else return Axios.post(DIET_DETAILS, body);
  }

  async function processUsers(Id) {
    let HID = editMode ? headerId : Id;
    let result;
    let list = [];
    for (let i = 0; i < foodItems.length; i++) {
      result = await make_api_call(HID, foodItems[i].itemId);
      list[i] = result;
    }
    console.log(list);
    return list;
  }

  const onSubmit = async (formdata) => {
    setSuccess(false);
    if (foodItems.length === 0) {
      setError(true);
      setErrMsg("Please select One food item");
      return;
    } else if (editMode) {
      setLoading(true);
      setInfo(true);
      setError(false);
      Axios.put(DIET_HEADER, { id: headerId, ...formdata })
        .then((res) => {
          console.log(res);
          let result = processUsers(headerId)
            .then((res) => {
              setError(false);
              setSuccess(true);
              setSuccessMsg("Diet Updated Successfully");
              console.log(res);
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
              setError(true);
              setErrMsg(err.message);
            });
        })
        .catch((err) => {
          setLoading(false);
          setError(true);
          setErrMsg(err.message);
        });
    } else {
      setLoading(true);
      setInfo(true);
      setError(false);
      Axios.post(DIET_HEADER, formdata)
        .then((res) => {
          setHeaderId(res.data);
          console.log(res);
          let result = processUsers(res.data)
            .then((res) => {
              setError(false);
              setSuccess(true);
              setSuccessMsg("Diet Added Successfully");
              console.log(res);
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
              setError(true);
              setErrMsg(err.message);
            });
        })
        .catch((err) => {
          setLoading(false);
          setError(true);
          setErrMsg(err.message);
        });
    }
  };

  const additem = (i, item) => {
    let state = foodItems.slice();
    const check_index = state.findIndex((i) => i.itemId === item.Id);
    if (check_index !== -1) {
      alert("item already present");
      return;
    } else {
      state.push({
        itemId: item.Id,
        itemName: item.Name,
        description: item.Description,
        checked: true,
      });
      console.log("The product has been added to cart:");
    }
    setFoodItems(state);
  };

  const removeitem = (e, i) => {
    let state = foodItems.slice();
    if (!e.target.checked) {
      const check_index = state.findIndex((food) => food.itemId === i);
      if (check_index !== -1) {
        state.splice(check_index, 1);
      } else return;
    }
    setFoodItems(state);
  };

  const handleDiningChange = (e) => {
    setValue("diningTime", e.value);
  };

  return (
    <>
      <Modal
        show={modal}
        onHide={() => setModal(false)}
        size="lg"
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FoodList fromAdmin={true} addItem={additem} />
        </Modal.Body>
      </Modal>

      <Row className="justify-content-md-center">
        <Col md={9}>
          {error && <ErrorText msg={errMsg} />}

          {success && (
            <CustomResponseMessage
              type={RESPONSETYPES.SUCCESS}
              msg={successMsg}
            />
          )}
          <form>
            {/* <Card>
            <Card.Header>
              <Card.Title as="h5">Add Diet</Card.Title>
            </Card.Header>
            <Card.Body> */}
            <Form.Group as={Row} controlId="formPlaintextEmail1">
              <Form.Label column sm="3">
                Code
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  {...register("code", {
                    required: true,
                  })}
                  type="text"
                  placeholder="Code"
                  className="mb-3"
                />
                {errors.code && <ErrorText msg="This Field is Required" />}
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextEmail1">
              <Form.Label column sm="3">
                Name
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  {...register("name", {
                    required: true,
                  })}
                  type="text"
                  placeholder="Name"
                  className="mb-3"
                />
                {errors.name && <ErrorText msg="This Field is Required" />}
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextEmail1">
              <Form.Label column sm="3">
                Dining Time
              </Form.Label>
              <Col sm="9">
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  options={DINING_TIMES}
                  defaultValue={editMode && getDinignTime(diet.DiningTime)}
                  onChange={handleDiningChange}
                />
              </Col>
            </Form.Group>
            <Row className="my-3">
              <Col>
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  Add Food item
                </Button>
              </Col>
            </Row>
            {foodItems.length == 0 ? (
              <div className="text-center"> Please Select Food items</div>
            ) : (
              foodItems.map((item, index) => (
                <Row className="m-3">
                  <Col md={12}>
                    <div className="form-group text-left">
                      <div className="checkbox checkbox-fill d-inline">
                        <input
                          type="checkbox"
                          name={`checkbox-fill-1`}
                          id={`checkbox-fill-a1`}
                          checked={item.checked}
                          onChange={(e) => {
                            removeitem(e, item.itemId);
                          }}
                        />
                        <label htmlFor="checkbox-fill-a1" className="cr">
                          {" "}
                          {item.itemName}
                        </label>
                        <label htmlFor="checkbox-fill-a1" className="cr ml-4">
                          {" "}
                          {item.description} Desc comes here
                        </label>
                      </div>
                    </div>
                  </Col>
                </Row>
              ))
            )}
            <div className="mb-5"></div>
            <Form.Group as={Row} controlId="formPlaintextEmail1">
              <Form.Label column sm="3"></Form.Label>
              <Col sm="9">
                <Row>
                  <Col>
                    <Button
                      type="submite"
                      onClick={handleSubmit(onSubmit)}
                      className="shadow-5"
                      block
                      variant="primary"
                    >
                      {postLoading ? "wait ..." : "submit"}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Form.Group>
            {/* </Card.Body>
          </Card> */}
          </form>
        </Col>
      </Row>
    </>
  );
};

export default AddDiet;
