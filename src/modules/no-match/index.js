import React from 'react';
import { Link } from 'react-router';

function NoMatch() {
  return (
    <div>
      <p>404</p>
      <p>Try:</p>
      <ul>
        <li><Link to='/tree'>tree</Link></li>
      </ul>
    </div>
  );
}

export default NoMatch;
