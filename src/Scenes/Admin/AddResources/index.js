import React from "react";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import * as Add from "./Add/index";
import Diet from "../Diet&Food/Diet";
import AddDiet from "../Diet&Food/AddDiet";
import FoodItems from "../Diet&Food/FoodItems";

const AdminHome = () => {
  return (
    <>
      <Row className="justify-content-md-center">
        <Col md={10} xl={10}>
          <Tabs variant="pills" defaultActiveKey="hospital" className="mb-3">
            <Tab eventKey="hospital" title="Hospital">
              <Add.AddHospital />
            </Tab>
            <Tab eventKey="assign" title="Assign Rooms">
              <Add.AssignRooms />
            </Tab>
            <Tab eventKey="user" title="Users">
              <Add.AddUser />
            </Tab>
            <Tab eventKey="dept" title="Department">
              <Add.AddDepartment />
            </Tab>
            <Tab eventKey="ns" title="Nursing Stations">
              <Add.AddStations />
            </Tab>
            <Tab eventKey="RC" title="Room Category">
              <Add.AddRoomCategory />
            </Tab>
            <Tab eventKey="AR" title="ADD Room">
              <Add.AddRooms />
            </Tab>
            <Tab eventKey="EMPD" title="Designations">
              <Add.AddDesignation />
            </Tab>
            <Tab eventKey="EMP" title="Employees">
              <Add.AddEmployee />
            </Tab>
            <Tab eventKey="diet" title="Diet">
              <Diet />
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

export default AdminHome;
