import React from "react";
import { useHistory, NavLink } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { getHeader, resetHeader } from "../../Data/userData";
import { signout } from "../../Services/user";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    color: "white",
    textDecoration: "none",
  },
  button: {
    color: "white",
    backgroundColor: "black",
  },
}));

export const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const history = useHistory();

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = async () => {
    const response = await signout();
    handleMenuClose();

    if (response.code !== undefined) {
      alert(`Code: ${response.code}\nMessage: ${response.message}`);
    } else {
      resetHeader();
      history.push("/login");
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {getHeader().authorization === "" ? (
        <div>
          <MenuItem onClick={handleMenuClose}>
            <NavLink to="/signup">Signup</NavLink>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <NavLink to="/login">Login</NavLink>
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem onClick={handleMenuClose}>
            <NavLink to="/profile">Profile</NavLink>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <NavLink to="/myQuestions">My Questions</NavLink>
          </MenuItem>
          <MenuItem onClick={handleSignout}>Signout</MenuItem>
        </div>
      )}
    </Menu>
  );

  const submit = () => {
    history.push("/question/post");
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap>
            <NavLink to="/" className={classes.title}>
              QA App
            </NavLink>
          </Typography>
          <Button
            variant="contained"
            className={classes.button}
            disableElevation
            onClick={submit}
          >
            Ask Question
          </Button>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};
