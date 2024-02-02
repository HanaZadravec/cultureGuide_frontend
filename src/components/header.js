import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './Logout';
import "./header.css";

const Header = ({ color }) => {return (
        <div className={color}>
             <div className="header-buttons d-flex justify-content-end">
               <Link to="/profile" className="btn">
                    Profile
                </Link>
                <LogoutButton className="btn-logout" />
            </div>
        </div>
    );
}

export default Header;