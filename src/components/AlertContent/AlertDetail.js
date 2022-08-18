/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Image } from "react-bootstrap"
import ReactAudioPlayer from 'react-audio-player';
import moment from 'moment'

import axios from '../../plugins/axios'

import WaveForm from '../../assets/svgs/waveform.svg'
import Spectogram from '../../assets/svgs/spectogram.svg'

const AlertDetail = ({alertData, machineData}) => {
  const urlAnomalyWav = `http://localhost:3001/static/${alertData.soundClip}`
  const urlNormalWav = `http://localhost:3001/static/${machineData.normalSound}`

  // update data
  const [updateData, setUpdateData] = useState({
    reason: 0,
    action: 0,
    comment: ""
  })
  const inputHandler = (event) => {
    setUpdateData({
      ...updateData,
      [event.target.name]: event.target.value
    })
  }
  const onUpdateSubmit = async () => {
    if (updateData.reason === '0') {
      alert('please select the reason first')
      return
    }

    if (updateData.action === '0') {
      alert('please select the action first')
      return
    }

    let mapData = {
      reasonId: updateData.reason,
      actionId: updateData.action,
      comment: updateData.comment
    }

    try {
      await axios.patch(`/alert/anomalies/${alertData.idData}`, mapData)
      alert('update success')
    } catch (error) {
      alert(error)
    }
  }

  // get Action
  const [actions, setActions] = useState([])
  const getActions = async () => {
    try {
      const resp = await axios.get('/alert/actions')
      setActions(resp.data)
    } catch (error) {
      alert(error)
    }
  }
  // get Reason
  const [reasons, setReasons] = useState([])
  const getReasons = async () => {
    try {
      if (alertData.machineId) {
        const resp = await axios.get(`/alert/reasons/bymachine/${alertData.machineId}`)
        setReasons(resp.data)
      }
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    getActions()
    getReasons()
  }, [])

  return (
    <Container fluid>
      <div className="py-4 d-flex flex-column justify-content-start align-items-start" style={{ borderBottom: '1px solid #dcddde' }}>
        <h3 className='mb-0 text-muted fw-normal'>ALERT ID {alertData.id}</h3>
        <h5 className='text-muted fw-normal'>Detected at {moment(alertData.detectionTime).format('YYYY-MM-DD HH:mm:ss')}</h5>
      </div>
      <Row className='my-3'>
        <Col>
          <h4 className='text-muted fw-normal'>Anomaly Machine Output</h4>
          <ReactAudioPlayer controls src={urlAnomalyWav} />
          <Image className="my-4" src={WaveForm}></Image>
          <Image src={Spectogram}></Image>
        </Col>
        <Col>
          <h4 className='text-muted fw-normal'>Normal Machine Output</h4>
          <ReactAudioPlayer controls src={urlNormalWav} />
          <Image className="my-4" src={WaveForm}></Image>
          <Image src={Spectogram}></Image>
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <label className='fw-bold fs-6'>Equipment</label>
          <h5 className='text-muted fw-normal'>CNC Machine</h5>
          <label className='fw-bold fs-6'>Suspected Reason</label>
          <Form.Select aria-label="Default select example" name='reason' onChange={inputHandler}>
            <option value={0}>Unknown Anomally</option>
            {reasons.map((rs, ind) => <option value={rs.id} key={ind+'rs'}>{rs.name}</option>)}
          </Form.Select>
          <label className='mt-3 fw-bold fs-6'>Action Required</label>
          <Form.Select aria-label="Default select example" name='action' onChange={inputHandler}>
            <option value={0}>Select Action</option>
            {actions.map((act, ind) => (
              <option value={act.id} key={ind+'act'}>{act.name}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          <label className='mt-4 fw-bold fs-6'>Comment</label>
          <textarea className="form-control" rows={6} name='comment' onChange={inputHandler}></textarea>
        </Col>
      </Row>
      <Row className='my-4'>
        <Col sm={2}>
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={onUpdateSubmit}>Update</Button>
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