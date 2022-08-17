import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import NavigationBar from './components/NavigationBar/NavigationBar'
import AlertContent from './components/AlertContent/AlertContent'
import DashboardContent from './components/DashboardContent'

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Container fluid style={{ padding: '16px 20px', backgroundColor: '#f8f8ff' }}>
        <Routes>
          <Route path="/" element={<DashboardContent />} />
          <Route path="/alerts" element={<AlertContent />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
