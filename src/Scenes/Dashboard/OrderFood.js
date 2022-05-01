import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Modal, Card, Spinner } from "react-bootstrap";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { DIET_HEADER, FOOD_ITEMS, FOOD_ORDER } from "../../configs/apiRoutes";
import useFetch from "../../configs/useFetch";
import "./style.css";
import CartList from "./CartList";
import Axios from "axios";
import { dropDownvalues } from "../../configs/helpers";
import { RESPONSETYPES } from "../../constants";
import CustomResponseMessage from "../../App/components/CustomResponseMessage";
import { useAxios } from "../../configs/useAxios";
const dosa = require("../../assets/images/dosa.png");

const OrderFood = ({ onCancel, category }) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const [time, setTime] = useState("");
  const [diet, setDiet] = useState("");
  const [forPatient, setForPatient] = useState("");
  const [modal, setModal] = useState(false);
  const [Fdata, setFData] = useState([]);
  const [info, setInfo] = useState(true);
  const [foodDesc, setFoodDesc] = useState("");
  const foodTimes = [
    { value: 1, label: "Breakfast" },
    { value: 2, label: "Lunch" },
    { value: 3, label: "Dinner" },
  ];

  const { data: foodData, loading, error, getData } = useFetch(FOOD_ITEMS);
  const {
    data: dietData,
    loading: dietLoading,
    error: dietError,
    getData: getDietData,
  } = useFetch(DIET_HEADER);

  const [foodItems, setfoodItems] = useState([
    {
      itemId: 5,
      qty: 2,
      Name: "Fish fry",
      description: "",
    },
  ]);

  const {
    response: postData,
    error: postError,
    loading: postLoading,
    apiRqst,
  } = useAxios();

  const additem = (quantity, item) => {
    let state = foodItems.slice();
    const check_index = state.findIndex((i) => i.itemId === item.itemId);
    if (check_index !== -1) {
      state[check_index].qty++;
      console.log("Quantity updated:", item.Name);
    } else {
      state.push({
        qty: quantity,
        description: "",
        itemId: item.Id,
        Name: item.Name,
      });
      console.log("The product has been added to cart:");
    }
    setfoodItems(state);
  };

  const getFooddata = () => {
    getData();
    setFData(foodData);
  };

  const addQuantity = (id) => {
    let state = foodItems.slice();
    const check_index = state.findIndex((item) => item.itemId === id);
    state[check_index].qty++;
    setfoodItems(state);
    console.log("Quantity updated:");
  };

  const minusQuantity = (id) => {
    let state = foodItems.slice();
    const check_index = state.findIndex((item) => item.itemId === id);
    if (state[check_index].qty - 1 == 0) {
      state.splice(check_index, 1);
    } else state[check_index].qty--;
    console.log("Quantity updated:");
    setfoodItems(state);
  };

  const updateDesc = (text, i) => {
    console.log(text);
    let state = foodItems.slice();
    const check_index = state.findIndex((item) => item.itemId === i);
    state[check_index].description = text;
    setfoodItems(state);
  };

  const submitFoodOrder = () => {
    let body = {
      roomId: userData.RoomId,
      diningTime: time,
      dietId: diet,
      forPatient: forPatient ? 1 : 0,
      arrayOfItems: foodItems,
    };

    setInfo(true);
    apiRqst({
      method: "POST",
      url: FOOD_ORDER,
      data: body,
    }).then(() => {
      setTimeout(() => {
        setInfo(false);
      }, 3000);
    });
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
          {Fdata.length > 0 ? (
            Fdata.map((food, i) => {
              return (
                <>
                  <Card key={i}>
                    <Card.Body className="p-2">
                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <div>
                          <Card.Img src={dosa} className="food-thumb" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-black text-center">
                            {food.Name}
                          </h4>
                        </div>

                        <div className="ml-3">
                          <Button
                            variant="success"
                            onClick={() => additem(1, food)}
                          >
                            Select
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </>
              );
            })
          ) : (
            <Spinner />
          )}
        </Modal.Body>
      </Modal>

      <Row className="justify-content-md-center">
        <Col>
          {info && postData ? (
            <CustomResponseMessage
              type={RESPONSETYPES.SUCCESS}
              msg={postData}
            />
          ) : null}
          {info && postError ? (
            <CustomResponseMessage type={RESPONSETYPES.ERROR} />
          ) : null}
          <Card>
            <Card.Header>
              <Card.Title as="h5">Food Details</Card.Title>
              <Form.Group
                className="d-flex align-items-center justify-content-between mx-2 mt-2"
                as={Row}
                controlId="formPlaintextEmail1"
              >
                <Form.Label sm="1">Room No</Form.Label>
                <Col sm="2" md="9">
                  <Form.Control
                    disabled={true}
                    type="text"
                    placeholder="RoomID"
                    value={userData.Room}
                    //value will be taken from localStorage
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="formPlaintextEmail1"
                className="d-flex align-items-center justify-content-between mx-2 mt-2"
              >
                <Form.Label sm="3">BreakFast/Lunch</Form.Label>
                <Col sm="2" md="9">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={foodTimes[0]}
                    options={foodTimes}
                    onChange={(e) => setTime(e.value)}
                  />
                </Col>
              </Form.Group>
              {dietData?.length > 0 && (
                <Form.Group
                  as={Row}
                  controlId="formPlaintextEmail1"
                  className="d-flex align-items-center justify-content-between mx-2 mt-2"
                >
                  <Form.Label sm="3">Select Diet</Form.Label>
                  <Col sm="2" md="9">
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={dropDownvalues(dietData)[0]}
                      options={dropDownvalues(dietData)}
                      onChange={(e) => setDiet(e.value)}
                    />
                  </Col>
                </Form.Group>
              )}
              <Form.Group
                as={Row}
                controlId="formPlaintextEmail1"
                className="d-flex align-items-center justify-content-between mx-2 mt-2"
              >
                <Form.Label sm="3">For Patient</Form.Label>
                <Col sm="2" md="9">
                  <div className="form-group text-left">
                    <div className="checkbox checkbox-fill d-inline">
                      <input
                        type="checkbox"
                        name="checkbox-fill-1"
                        id="checkbox-fill-a1"
                        onChange={(e) => setForPatient(e.target.checked)}
                      />
                      <label htmlFor="checkbox-fill-a1" className="cr"></label>
                    </div>
                  </div>
                </Col>
              </Form.Group>
            </Card.Header>
            <Card.Body>
              <Button
                size="sm"
                variant="success"
                onClick={() => {
                  getFooddata();
                  setModal(true);
                }}
              >
                Add Food item
              </Button>
              <CartList
                foodItems={foodItems}
                addQuantity={addQuantity}
                minusQuantity={minusQuantity}
                updateDesc={updateDesc}
              />
            </Card.Body>
            <Card.Footer>
              <Form.Group as={Row} controlId="formPlaintextEmail1">
                <Form.Label column sm="3"></Form.Label>
                <Col sm="6">
                  <Row>
                    <Col>
                      <Button
                        className="shadow-5"
                        block
                        variant="primary"
                        onClick={() => submitFoodOrder()}
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Form.Group>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderFood;
