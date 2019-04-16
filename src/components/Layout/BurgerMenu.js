import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";
import { NoFocus, BurgerDiv } from "../Styles/NavBarStyles"

class BurgerMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <BurgerDiv>
        <IconButton
          aria-label="Menu"
          aria-owns={open ? "long-menu" : undefined}
          aria-haspopup="true"
          onClick={open ? this.handleClose : this.handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: 250,
              width: 200,
              marginTop: "2.2rem"
            }
          }}
        >
          <NoFocus style={{textDecoration: "none"}} to="/browse"><MenuItem onClick={this.handleClose}>Home</MenuItem></NoFocus>
          <NavLink style={{textDecoration: "none"}} to="/my-library"><MenuItem onClick={this.handleClose}>My Library</MenuItem></NavLink>
          <NavLink style={{textDecoration: "none"}} to="/add-book"><MenuItem onClick={this.handleClose}>Add book</MenuItem></NavLink>
          <NavLink style={{textDecoration: "none"}} to="/requests"><MenuItem onClick={this.handleClose}>Requests</MenuItem></NavLink>
          <NavLink style={{textDecoration: "none"}} to="/profile"><MenuItem onClick={this.handleClose}>Profile</MenuItem></NavLink>
        </Menu>
      </BurgerDiv>
    );
  }
}

export default BurgerMenu;
