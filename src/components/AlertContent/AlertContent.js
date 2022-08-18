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
  const [selectedId, setSelectedId] = useState("#00013211");
  const [alerts, setAlerts] = useState([])
  const getAlertsByMachine = async (machineId) => {
    try {
      const respAlerts = await axios.get(`/alert/anomalies/bymachine/${machineId}`)
      setAlerts(respAlerts.data.map(dt => {
        return {
          id: dt.generatedId,
          anomaly: dt.name,
          detectionTime: dt.detectedAt,
          machine: dt.machine.name,
          reason: dt.reason.name,
          isAlreadyOpen: dt.isAlreadyOpen,
        }
      }))
    } catch (error) {
      alert(error)
    }
  }

  const selectedAlert = alerts.find((ad) => ad.id === selectedId);

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
                6 Alert{" "}
                <Badge pill bg="primary" style={{ marginLeft: 10 }}>
                  2 New
                </Badge>
              </Card.Body>
              <Card.Body>
                {alerts.map((ad, ind) => (
                  <div onClick={() => setSelectedId(ad.id)} key={ind + "ai"}>
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
