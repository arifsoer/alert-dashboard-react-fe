import { Button, Col, Container, Form, Row } from "react-bootstrap"
import ReactAudioPlayer from 'react-audio-player';
import moment from 'moment'

import Wav1 from '../../assets/wavs/1.wav'

const AlertDetail = ({alertData}) => {  
  return (
    <Container fluid>
      <div className="py-4 d-flex flex-column justify-content-start align-items-start" style={{ borderBottom: '1px solid #dcddde' }}>
        <h3 className='mb-0 text-muted fw-normal'>ALERT ID {alertData.id}</h3>
        <h5 className='text-muted fw-normal'>Detected at {moment.unix(alertData.detectionTime).format('YYYY-MM-DD HH:mm:ss')}</h5>
      </div>
      <Row className='my-3'>
        <Col>
          <h4 className='text-muted fw-normal'>Anomaly Machine Output</h4>
          <ReactAudioPlayer controls src={Wav1} />
        </Col>
        <Col>
          <h4 className='text-muted fw-normal'>Normal Machine Output</h4>
          <ReactAudioPlayer controls src={Wav1} />
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <label className='fw-bold fs-6'>Equipment</label>
          <h5 className='text-muted fw-normal'>CNC Machine</h5>
          <label className='fw-bold fs-6'>Suspected Reason</label>
          <Form.Select aria-label="Default select example">
            <option>Unknown Anomally</option>
            <option>Spindle Error</option>
          </Form.Select>
          <label className='mt-3 fw-bold fs-6'>Action Required</label>
          <Form.Select aria-label="Default select example">
            <option>Select Action</option>
            <option>Immediate</option>
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          <label className='mt-4 fw-bold fs-6'>Comment</label>
          <textarea class="form-control" rows={6}></textarea>
        </Col>
      </Row>
      <Row className='my-4'>
        <Col sm={2}>
          <div className="d-grid gap-2">
            <Button variant="primary" >Update</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

AlertDetail.defaultProps = {
  alertData: {
    id: '#00013211',
    anomaly: 'Moderate',
    detectionTime: 1628676001,
    machine: 'CNC Machine',
    reason: 'Unknown Anomally',
    isAlreadyOpen: false
  }
}

export default AlertDetail