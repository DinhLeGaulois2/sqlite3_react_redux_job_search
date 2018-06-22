import React from 'react'
import { Route, NavLink } from "react-router-dom";
import requireAuth from '../requireAuth'
import '../HeaderStyle.css';
import { connect } from 'react-redux'
import actions from '../../actions/jobSearchAction'

import DisplayAllComponent from './DisplayAllComponent'

class DisplayUIComponent extends React.Component {
    constructor(props) {
        super(props)
        this.props.setUI2Display()
    }
    
    render() {
        const { match } = this.props
        return (
            <div>
                <div style={{ "backgroundColor": "black" }}>
                    <br />
                    <p align="center">
                        <NavLink to={`${match.url}/all`} className="navLink" activeStyle={{ color: 'blue', fontSize: 'bold' }}>All</NavLink>
                        <NavLink to={`${match.url}/missed`} className="navLink" activeStyle={{ color: 'blue', fontSize: 'bold' }}>Missed</NavLink>
                        <NavLink to={`${match.url}/pending`} className="navLink" activeStyle={{ color: 'blue', fontSize: 'bold' }}>Pending</NavLink>
                        <NavLink to={`${match.url}/recent`} className="navLink" activeStyle={{ color: 'blue', fontSize: 'bold' }}>Most Recents First</NavLink>
                        <NavLink to={`${match.url}/bycompanyname`} className="navLink" activeStyle={{ color: 'blue', fontSize: 'bold' }}>By Company Names</NavLink>
                    </p>
                    <br />
                </div>

                <Route path={`${match.url}/all`} exact component={DisplayAllComponent} />
                <Route path={`${match.url}/missed`} exact component={DisplayAllComponent} />
                <Route path={`${match.url}/pending`} exact component={DisplayAllComponent} />
                <Route path={`${match.url}/recent`} exact component={DisplayAllComponent} />
                <Route path={`${match.url}/bycompanyname`} exact component={DisplayAllComponent} />
            </div>
        )
    }
}

export default connect(null, actions)(requireAuth(DisplayUIComponent))