/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  Card,
  Col,
  Dropdown,
  Row,
  Button,
  Image,
  Badge,
} from "react-bootstrap";

import axios from "../../plugins/axios";

import BackTriangle from "../../assets/svgs/back-triangle.svg";

import AlertItem from "./AlertItem";
import AlertDetail from "./AlertDetail";

const AlertContent = () => {
  
  // machines module
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState({})
  const getMachines = async () => {
    try {
      const resp = await axios.get("/alert/machines");
      setMachines(resp.data);
      if (Object.keys(selectedMachine).length === 0) {
        setSelectedMachine(resp.data[0])
      }
      getAlertsByMachine(resp.data[0].id)
    } catch (error) {
      alert(error);
    }
  };
  const machineSelectHandler = (key) => {
    setSelectedMachine(machines[key])
    getAlertsByMachine(machines[key].id)
  }
  useEffect(() => {getMachines()}, [])

  // get alerts data
  const [selectedId, setSelectedId] = useState("");
  const [selectedAlert, setSelectedAlert] = useState({})
  const [alerts, setAlerts] = useState([])
  const [totalAlert, setTotalAlert] = useState(0)
  const [unreadAlert, setUnreadAlert] = useState(0)
  // get alert from server
  const getAlertsByMachine = async (machineId) => {
    try {
      const respAlerts = await axios.get(`/alert/anomalies/bymachine/${machineId}`)
      const mapedRespAlerts = respAlerts.data.map(dt => {
        return {
          id: dt.generatedId,
          anomaly: dt.name,
          detectionTime: dt.detectedAt,
          machine: dt.machine.name,
          reason: dt.reason.name,
          isAlreadyOpen: dt.isAlreadyOpen,
        }
      })
      setAlerts(mapedRespAlerts)
      setTotalAlert(mapedRespAlerts.length)
      setUnreadAlert(mapedRespAlerts.filter(a => !a.isAlreadyOpen).length)

      // handle selected
      if(selectedId === '') {
        setSelectedId(mapedRespAlerts[0].id)
      }
      if(Object.keys(selectedAlert).length === 0) {
        setSelectedAlert(mapedRespAlerts[0])
      }
    } catch (error) {
      alert(error)
    }
  }
  // Alert Item Click Handler
  const alertClickHandler = (id) => {
    setSelectedId(alerts[id].id)
    console.log("selected :", alerts[id])
    setSelectedAlert(alerts[id])
  }

  return (
    <Card>
      <Card.Body
        style={{ borderBottom: "1px solid #b8babc", padding: "4px 14px" }}
      >
        <Dropdown onSelect={machineSelectHandler}>
          <Dropdown.Toggle variant="outline-dark">{selectedMachine.name}</Dropdown.Toggle>
          <Dropdown.Menu>
            {machines.map((mc, ind) => (
              <Dropdown.Item eventKey={ind} key={ind + "di"}>{mc.name}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Card.Body>
      <Row>
        <Col sm={3}>
          <Card>
            <Card.Body>
              <Button variant="outline-dark" style={{ border: 0 }}>
                <Image src={BackTriangle} style={{ marginRight: 16 }} />
                Back
              </Button>
            </Card.Body>
            <Card>
              <Card.Body style={{ borderBottom: "1px solid #72757A" }}>
                {totalAlert} Alert{" "}
                <Badge pill bg="primary" style={{ marginLeft: 10 }}>
                  {unreadAlert} New
                </Badge>
              </Card.Body>
              <Card.Body>
                {alerts.map((ad, ind) => (
                  <div onClick={() => alertClickHandler(ind)} key={ind + "ai"}>
                    <AlertItem alertData={ad} selectedId={selectedId} />
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Card>
        </Col>
        <Col sm={9}>
          <AlertDetail selectedAlert={selectedAlert} />
        </Col>
      </Row>
    </Card>
  );
};

export default AlertContent;
