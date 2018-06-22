import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './HeaderStyle.css';

class Header extends Component {
  renderNavLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <NavLink to="/mainMenu" className="navLink" strict activeStyle={{ color: 'blue' }}>Go!</NavLink>
          <NavLink to="/signout" className="navLink" strict activeStyle={{ color: 'blue' }}>Sign Out</NavLink>
        </div>
      );
    } else {
      return (
        <div>
          <NavLink to="/signup" className="navLink" strict activeStyle={{ color: 'blue' }}>Sign Up</NavLink>
          <NavLink to="/signin" className="navLink" strict activeStyle={{ color: 'blue' }}>Sign In</NavLink>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="header" style={{ "backgroundColor": "black" }}>
        <span style={{ color: "black", backgroundColor: "white", fontSize: "1.5em", padding: '0px 10px', fontWeight: "bold" }}>Jobs Organizer</span>

        {this.renderNavLinks()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
