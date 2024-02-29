import {NavLink , Link} from "react-router-dom";
import { Navbar,Nav } from 'react-bootstrap';

function NavBar(porps) {

    return(
        <Navbar expand="lg" variant="dark" className="sticky-top">
        <Navbar.Brand>{porps.heding}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
          <NavLink to="/dashboard" className='nav-link' activeClassName="active">Dashboard</NavLink>
            <NavLink to="/dashboard/stockoverview" className='nav-link' activeClassName="active">Stock Overview</NavLink>
            <NavLink to="/dashboard/invest" className='nav-link' activeClassName="active">Invest</NavLink>
            <NavLink to="/dashboard/portfolio" className='nav-link' activeClassName="active">Portfolio</NavLink>
            <NavLink to="/dashboard/esg" className='nav-link' activeClassName="active">ESG Education</NavLink>
            <NavLink to="/dashboard/transaction-history" className='nav-link' activeClassName="active">Transactions</NavLink>
            <NavLink to="/dashboard/add-amount" className='nav-link' activeClassName="active">Add Amount</NavLink>
            <NavLink to="/dashboard/profile" className='nav-link' activeClassName="active">Profile</NavLink>
            <Link to="/dashboard/logout" className='nav-link' activeClassName='active'>Logout</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )

}


export default NavBar;