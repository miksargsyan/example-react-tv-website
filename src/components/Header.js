import React, { useEffect, useState } from "react";
import logo from "../server_mock/Netflix-logo.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import {
  HOME_ROUTE,
  LATEST_ROUTE,
  MOVIES_ROUTE,
  MYLIST_ROUTE,
  REWATCH_ROUTE,
  TVSHOWS_ROUTE,
} from "./Constants";

const getLogo = () => {
  return logo;
};

const Logo = () => {
  return (
    <li>
      <Link to={HOME_ROUTE}>
        <img alt="Netflix" src={getLogo()} />
      </Link>
    </li>
  );
};

const SearchBar = (props) => {
  const [activeSearch, setActiveSearch] = useState(false);

  return activeSearch ? (
    <TextField
      autoFocus
      id="input-with-icon-textfield"
      label=""
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      onKeyDown={(e) => {
        if (e.keyCode === 27) {
          setActiveSearch(false);
        }
      }}
    />
  ) : (
    <SearchIcon color="primary" onClick={() => setActiveSearch(true)} />
  );
};

const HeaderItem = (props) => {
  const { route, label } = props;
  const highlighted = route === useLocation().pathname;
  const [active, setActive] = useState(highlighted);
  useEffect(() => {
    setActive(highlighted);
  }, [highlighted]);

  return (
    <li>
      <NavLink
        to={route}
        style={() => ({
          fontWeight: active ? "bold" : "normal",
        })}
      >
        {label}
      </NavLink>
    </li>
  );
};

// TODO : make ul Grid
const Header = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <Logo />
            <HeaderItem route={HOME_ROUTE} label="Home" />
            <HeaderItem route={TVSHOWS_ROUTE} label="TV Shows" />
            <HeaderItem route={MOVIES_ROUTE} label="Movies" />
            <HeaderItem route={LATEST_ROUTE} label="Latest" />
            <HeaderItem route={MYLIST_ROUTE} label="My List" />
            <HeaderItem route={REWATCH_ROUTE} label="Rewatch" />
          </ul>
          <SearchBar />
        </nav>
      </header>
    </>
  );
};

export default Header;
