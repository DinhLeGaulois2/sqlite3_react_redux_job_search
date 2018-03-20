// Inspired by: https://www.youtube.com/watch?v=WGjv-p9jYf0

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import store from '../../store'
import { Provider } from 'react-redux'
require('./modalStyle.scss')

class Modal extends Component {
    componentDidMount() {
        this.modalTarget = document.createElement('div')
        this.modalTarget.className = 'modal'

        document.body.appendChild(this.modalTarget)
        this._render()
    }

    componentWillUpdate() { this._render() }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this.modalTarget)
        document.body.removeChild(this.modalTarget)
    }

    _render() {
        ReactDOM.render(
            <Provider store={store}>
                <div>{this.props.children}</div>
            </Provider>,
            this.modalTarget
        )
    }

    render() { return <noscript /> }
}

export default Modal