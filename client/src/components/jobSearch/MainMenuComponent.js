import React from 'react'
import { Route, NavLink } from "react-router-dom";
import requireAuth from '../requireAuth'
import '../HeaderStyle.css';
import '../../style.scss'

import AddComponent from './AddComponent'
import DisplayUIComponent from './DisplayUIComponent'

const MainMenuComponent = ({ match }) =>
    <div>
        <div style={{ "backgroundColor": "#1b5c71", "padding": "5px" }}>
            <NavLink to={`${match.url}/add`} className="navLink" strict activeStyle={{ color: 'blue' }}>Add</NavLink>
            <NavLink to={`${match.url}/display`} className="navLink" strict activeStyle={{ color: 'blue' }}>Display</NavLink>
        </div>
        <Route path={`${match.url}/add`} component={AddComponent} />
        <Route path={`${match.url}/display`} component={DisplayUIComponent} />
    </div>

export default requireAuth(MainMenuComponent)