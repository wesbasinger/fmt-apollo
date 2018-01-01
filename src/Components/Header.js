import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <Link to="/">FMT Workday Sign In</Link>
            <ul>
                <li><Link to="/signIn">Sign In</Link></li>
                <li><Link to="/signOut">Sign Out</Link></li>
                <li><Link to="/lookup">Lookup</Link></li>
            </ul>
        </div>
    )
}

export default Header;

