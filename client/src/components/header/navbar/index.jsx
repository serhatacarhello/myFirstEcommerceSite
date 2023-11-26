import React from "react";
import MenuLinks from "../MenuLinks";
import MenuToggle from "../MenuToggle";
import Logo from "../logo";
import NavBarContainer from "../navbar-container";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Logo w="150px" color={"black"}  />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};
export default NavBar;
