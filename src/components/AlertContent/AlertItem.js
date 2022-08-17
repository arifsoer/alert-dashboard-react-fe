import { Card, Badge } from 'react-bootstrap'

const AlertItem = ({ alertData, selectedId }) => {
  const isSelected = selectedId === alertData.id
  return (
    <Card border={isSelected ? 'primary' : ''} className='mb-2' style={{ borderWidth: isSelected ? 'medium' : 'thin' }} >
      <Card.Body className='pt-2'>
        <div className='mb-3 d-flex justify-content-between align-items-center'>
          <span style={{ height: 12, width: 12, borderRadius: '50%', backgroundColor: alertData.isAlreadyOpen ? 'transparent' : '#3478FC' }}></span>
          <h5 className='fw-normal flex-grow-1 ms-2 mb-1'>ID {alertData.id}</h5>
          <Badge pill bg='warning' className='fs-5 fw-normal'>{alertData.anomaly}</Badge>
        </div>
        <h5 className='ms-3 fw-bolder'>{alertData.reason}</h5>
        <h5 className='ms-3 fw-normal'>Detected at 2021-06-18 20:10:04</h5>
        <h5 className='ms-3 text-primary fw-normal pt-3'>{alertData.machine}</h5>
      </Card.Body>
    </Card>
  )
}

AlertItem.defaultProps = {
  alertData: {
    id: '#00013211',
    anomaly: 'Moderate',
    detectionTime: 1628676001,
    machine: 'CNC Machine',
    reason: 'Unknown Anomaly',
    isAlreadyOpen: false
  },
  selectedId: '#00013211'
}

export default AlertItem
