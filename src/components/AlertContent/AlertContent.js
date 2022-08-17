import { useState} from 'react'
import { Card, Col, Dropdown, Row, Button, Image, Badge } from 'react-bootstrap'

import BackTriangle from '../../assets/svgs/back-triangle.svg'

import AlertItem from './AlertItem'
import AlertDetail from './AlertDetail'

const AlertContent = () => {
  const [selectedId, setSelectedId] = useState('#00013211')

  const alertDatas = [
    {
      id: '#00013211',
      anomaly: 'Moderate',
      detectionTime: 1628676001,
      machine: 'CNC Machine',
      reason: 'Unknown Anomally',
      isAlreadyOpen: false
    },
    {
      id: '#00013212',
      anomaly: 'Moderate',
      detectionTime: 1628676001,
      machine: 'CNC Machine',
      reason: 'Unknown Anomally',
      isAlreadyOpen: true
    }
  ]

  const selectedAlert = alertDatas.find(ad => ad.id === selectedId)

  return (
    <Card>
      <Card.Body style={{ borderBottom: '1px solid #b8babc', padding: '4px 14px' }}>
        <Dropdown>
          <Dropdown.Toggle variant="outline-dark">
            CNC Machine
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>CNC Machine</Dropdown.Item>
            <Dropdown.Item>Milling Machine</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Body>
      <Row>
        <Col sm={3}>
          <Card>
            <Card.Body>
              <Button variant='outline-dark' style={{ border: 0 }}>
                <Image src={BackTriangle} style={{ marginRight: 16 }} />
                Back
              </Button>
            </Card.Body>
            <Card>
              <Card.Body style={{ borderBottom: '1px solid #72757A' }}>
                6 Alert <Badge pill bg='primary' style={{ marginLeft: 10 }}>2 New</Badge>
              </Card.Body>
              <Card.Body>
                {alertDatas.map((ad, ind) => (
                  <div onClick={() => setSelectedId(ad.id)} key={ind+'ai'}>
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
  )
}

export default AlertContent