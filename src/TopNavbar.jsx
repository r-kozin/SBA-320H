import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { toggleTheme } from "./redux/themeSlice";
import { useDispatch, useSelector } from "react-redux";

function TopNavbar() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme)

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">Rick and Morty</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
           <Nav.Link as={Link} to={'/'}>Home</Nav.Link>
            <Nav.Link as={Link} to={'/characters'}>Characters</Nav.Link>
            <Nav.Link as={Link} to={'/locations'}>Locations</Nav.Link>
            <Nav.Link as={Link} to={'/search'}>Search</Nav.Link>
            <Nav.Link as={Link} to={'/episodes'}>Episodes</Nav.Link>

          </Nav>
          <Form className="theme-container">
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="Toggle theme"
              onClick={() => dispatch(toggleTheme())}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;
