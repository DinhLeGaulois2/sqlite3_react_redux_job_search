import React from 'react'
import requireAuth from '../requireAuth'
import { Route, NavLink } from "react-router-dom";
import '../HeaderStyle.css';

import AddComponent from './AddComponent'

class AddUIComponent extends React.Component {
    render() {
        const { match } = this.props
        return (
            <div>
                <div style={{ "backgroundColor": "black" }}>
                    <br />
                    <p align="center">
                        <NavLink to={`${match.url}/job`} className="navLink" activeStyle={{ color: 'blue' }}>Add Job</NavLink>
                    </p>
                    <br />
                </div>
                <Route path={`${match.url}/job`} exact component={AddComponent} />
            </div>
        )
    }
}

export default requireAuth(AddUIComponent)