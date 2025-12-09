import React from 'react';
import { Link, Route } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
        <ul>
            <li><Link to ='/'>home</Link></li>
              <li><Link to ='/Signup'>Signup</Link></li>
                <li><Link to ='/Signin'>Signin</Link></li>
                  {/* <li><Link to ='/'>home</Link></li> */}
            </ul>
        </nav>
    );
}

export default Navbar;
