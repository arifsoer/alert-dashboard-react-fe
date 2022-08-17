import { Container, Navbar, Image, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

import './NavigationBar.css'

import GroudupLogo from '../../assets/svgs/GroundUp.svg'
import IconGear from '../../assets/svgs/icongear.svg'
import IconUser from '../../assets/svgs/iconuser.svg'
import IconNofitication from '../../assets/svgs/iconnotification.svg'

const NavigationBar = () => {
  return (
    <Navbar expand='lg' className='Navbar-bottom'>
      <Container fluid>
        <Navbar.Brand>
          <Image src={GroudupLogo} />
        </Navbar.Brand>
        <Navbar.Collapse>
          <Nav className='me-auto'>
            <Nav.Link as={NavLink} to="/">Dashboard</Nav.Link>
            <Nav.Link as={NavLink} to="/alerts">Alerts</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link>
              <Image src={IconGear} />
            </Nav.Link>
            <Nav.Link>
              <Image src={IconUser} />
            </Nav.Link>
            <Nav.Link>
              <Image src={IconNofitication} />
            </Nav.Link>
            <Nav.Link className='Navbar-Link-Admin'>Welcome Admin!</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
