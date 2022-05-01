import React from "react";
import { Row, Col, Form, Button, Modal, Card, Spinner } from "react-bootstrap";
const CartList = ({ foodItems, addQuantity, minusQuantity, updateDesc }) => {
  const dosa = require("../../assets/images/dosa.png");
  if (foodItems.length > 0) {
    return (
      <Row>
        {foodItems.map((food, i) => {
          return (
            <Col md={6} sm={3} key={i}>
              <Card>
                <Card.Body className="p-2">
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <div className="d-flex flex-row align-items-center justify-content-between">
                      <Card.Img src={dosa} className="foodlist-thumb" />
                      <div className="ml-3">
                        <h6 className="text-black text-center">
                          {foodItems[i].Name}
                        </h6>
                      </div>
                    </div>
                    <Form.Group as={Row} controlId="formPlaintextEmail1">
                      <Col sm="9">
                        <Form.Control
                          as="textarea"
                          rows="2"
                          placeholder="Notes"
                          onChange={(e) =>
                            updateDesc(e.target.value, food.itemId)
                          }
                        />
                      </Col>
                    </Form.Group>
                    <div className="ml-3 d-flex flex-row align-items-center justify-content-between">
                      <Button
                        className="btn-icon btn-rounded foodBtnLeft"
                        variant="success"
                        onClick={() => addQuantity(food.itemId)}
                      >
                        <i className="feather icon-plus" />
                      </Button>
                      <h4 className="text-black">{foodItems[i].qty}</h4>
                      <Button
                        className="btn-icon btn-rounded foodBtnRight"
                        variant="success"
                        onClick={() => minusQuantity(food.itemId)}
                      >
                        <i className="feather icon-minus" />
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  } else {
    return <span>Please add items</span>;
  }
};

export default CartList;
