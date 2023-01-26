import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="nav-menu">
            <Link to="/" className="nav-menu__item">
                Articles
            </Link>
            <Link to="/" className="nav-menu__item">
                All articles
            </Link>
            <Link to='/streams/new' className='nav-menu__item'>
                Create blog
            </Link>
        </div>
    );
};

export default Header;