import React, { useEffect } from "react";
import { Row, Col, Card, Form, Tabs, Tab } from "react-bootstrap";
import Select from "react-select";
import BTable from "../../Tables/BTable";
import StationToStation from "./StationToStation";
import OneSignal from "react-onesignal";
import CompletedConcerns from "./Concerns/Completed";
export const colourOptions = [
  { value: "Dept", label: "Ocean", color: "#00B8D9" },
  { value: "blue", label: "Blue", color: "#0052CC" },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630" },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];

const NursingStations = () => {
  useEffect(() => {
    OneSignal.init({ appId: "f6b1babe-e4d7-4ce0-8a0b-9a5783f11e07" });
  }, []);

  const setUserRoletag = () => {
    OneSignal.sendTag("role", "ADMIN", (result) => {
      console.log(result);
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <Row className="justify-content-md-center">
        <Col md={10} xl={10}>
          <Tabs variant="pills" defaultActiveKey="pending" className="mb-3">
            <Tab eventKey="pending" title="Pending Concenrs">
              <CompletedConcerns />
            </Tab>
            <Tab eventKey="completed" title="Completed Concerns">
              <CompletedConcerns />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default NursingStations;
