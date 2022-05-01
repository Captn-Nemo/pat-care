import React from "react";
import { Row, Col, Card, Form, Tabs, Tab } from "react-bootstrap";
import AddDiet from "./AddDiet";
import Diet from "./Diet";
import FoodItems from "./FoodItems";

const DietAndFoodItems = () => {
  return (
    <>
      <Row className="justify-content-md-center">
        <Col md={10} xl={10}>
          <Tabs variant="pills" defaultActiveKey="diet" className="mb-3">
            <Tab eventKey="diet" title="Diet">
              <Diet />
            </Tab>
            <Tab eventKey="addDiet" title="Add-Diet">
              <AddDiet />
            </Tab>
            <Tab eventKey="FoodItems" title="Food-Items">
              <FoodItems />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default DietAndFoodItems;
