import React from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse, Dropdown, DropdownToggle, DropdownMenu,  DropdownItem} from "mdbreact";

class Header extends React.Component {
    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
    render() {
        return (

            <Navbar color="indigo" dark expand="md">
                <NavbarBrand>
                    <NavLink to='/'><strong className="white-text">Lightning map and weather forecast</strong></NavLink>
                </NavbarBrand>
                <NavbarToggler
                    onClick={this.toggleCollapse}
                />
                <Collapse
                    id="navbarCollapse3"
                    isOpen={this.state.isOpen}
                    navbar
                >
                    <NavbarNav left>
                        <NavItem>
                            <Dropdown>
                                <DropdownToggle nav caret>
                                    <div className="d-md-inline">Continents</div>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <NavLink to="/europe">
                                        <DropdownItem>Europe</DropdownItem>
                                    </NavLink>
                                    <NavLink to="/australia">
                                        <DropdownItem>Australia</DropdownItem>
                                    </NavLink>
                                    <NavLink to="/northamerica">
                                        <DropdownItem>North America</DropdownItem>
                                    </NavLink>
                                    <NavLink to="/southamerica">
                                        <DropdownItem>South America</DropdownItem>
                                    </NavLink>
                                    <NavLink to="/africa">
                                        <DropdownItem>Africa</DropdownItem>
                                    </NavLink>
                                    <NavLink to="/asia">
                                        <DropdownItem>Asia</DropdownItem>
                                    </NavLink>
                                </DropdownMenu>
                            </Dropdown>
                        </NavItem>
                        <NavItem>
                            <NavLink to='/forecast'>Forecast</NavLink>
                        </NavItem>
                    </NavbarNav>
                </Collapse>
            </Navbar>
        );
    }
}

export default Header;