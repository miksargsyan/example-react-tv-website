import React from "react";
import logo from "../server_mock/Netflix-logo.png";
import { Link } from "react-router-dom";

const getLogo = () => {
  return logo;
};

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img alt="Netflix" src={getLogo()} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
