import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = props => {
    return (
      <div className="navbar">
        <ul>
          <li><Link to="/">Search</Link></li>
          <li id="count">
            <Link to="/compare">Compare</Link>
            <span>{props.count}</span>
          </li>
        </ul>
      </div>
    )
};

const mapStateToProps = (state) => {
  return {
    count: state.selected.length
  }
};

export default connect(mapStateToProps)(Navbar);