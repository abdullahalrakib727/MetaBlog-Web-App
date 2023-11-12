import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
// import Button from '@mui/material/Button';
// import AdbIcon from "@mui/icons-material/Adb";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

// const pages = ['Products', 'Pricing', 'Blog'];

function Nav() {
  const { user, logOutUser, loading } = React.useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  // console.log(user);

  const navLinks = (
    <>
      <MenuItem>
        <NavLink to="/">Home</NavLink>
      </MenuItem>
     {
      user &&  <MenuItem>
      <NavLink to="/add">Add Blog</NavLink>
    </MenuItem>
     }
      <MenuItem>
        <NavLink to="/all">All Blogs</NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="/featured">Featured Blogs</NavLink>
      </MenuItem>
      {
        user && <MenuItem>
        <NavLink to="/wishlist">Wishlist</NavLink>
      </MenuItem>
      }
    </>
  );

  const settings = (
    <>
      {/* conditional log in and logout */}
      {user ? (
        <>
          <MenuItem>
            <Link to="/profile">Profile</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/" onClick={() => logOutUser()}>
              Logout
            </Link>
          </MenuItem>
        </>
      ) : (
        <>
          {" "}
          <MenuItem>
            <Link to="/login">Login</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/register">Register</Link>
          </MenuItem>
        </>
      )}
    </>
  );

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Blog-Zone
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {navLinks}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Blog-Zone
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navLinks}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip
              className="flex mt-5 md:mt-0 md:flex-row flex-col items-center md:gap-4"
              title="Open settings"
            >
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* conditional User avatar */}
                {!user && <Avatar src="/broken-image.jpg" />}
                {user && <Avatar src={user?.photoURL} />}
              </IconButton>
              {/* conditional  User Name */}
              {user && <p>{user?.displayName}</p>}
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Nav;
