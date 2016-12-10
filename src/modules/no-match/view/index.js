import React from 'react'
import { Link } from 'react-router'
import './index.css'

function NoMatch() {
  return (
    <div className='NoMatch'>
      <h1 className='NoMatch__title'>404</h1>
      <p className='NoMatch__link'>
        <Link to='/'>Home</Link>
      </p>
    </div>
  )
}

export default NoMatch
