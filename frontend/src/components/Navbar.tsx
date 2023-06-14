import React from "react";
import {Link} from 'react-router-dom';

export function NavBar() {
  return(
    <nav>
      <div className="menu">
        <Link to="/">Home</Link> || <Link to="/products">Search</Link> ||{' '}
        <Link to="/api/product">Purchases</Link>
      </div>
    </nav>
  );
}
