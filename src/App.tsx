import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HarvestResources } from "./pages/HarvestResources/HarvestResources";
import { HarvestApplication } from "./pages/HarvestApplication/HarvestApplication";
import { HarvestDetailedResource } from "./pages/HarvestDetailedResource/HarvestDetailedResource";
import { Home } from "./pages/Home/Home";
import { ROUTES } from "./Routes";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar bg="success" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href={ROUTES.HOME}>
              Тепличный Север
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href={ROUTES.HARVEST_RESOURCES}>Список услуг</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.HARVEST_RESOURCES} element={<HarvestResources />} />
          <Route path={`${ROUTES.HARVEST_APPLICATION}/:id`} element={<HarvestApplication />} />
          <Route path={`${ROUTES.HARVEST_DETAILED_RESOURCE}/:id`} element={<HarvestDetailedResource />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;