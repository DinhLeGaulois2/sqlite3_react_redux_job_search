import React from 'react'
import { Field } from 'redux-form'

export const renderInputField = ({ input, placeholder, type, meta: { touched, error } }) => (
    <div>
        <label>{placeholder}</label>&nbsp;{error && <span>(<font color="red">{error}</font>)</span>}
        <div>
            <input
                {...input}
                placeholder={placeholder || ""}
                className="form-control"
            />
        </div>
    </div>
)

export const renderTextareaField = ({ textarea, input, placeholder, type, rows, cols, meta: { touched, error } }) => (
    <div>
        <label>{placeholder}</label>&nbsp;{error && <span>(<font color="red">{error}</font>)</span>}
        <div>
            <textarea
                // VERY IMPORTANT TO PUT "INPUT" LIKE BELOW ...
                {...input}
                placeholder={placeholder || ""}
                className="form-control"
                rows={rows || "3"}
                cols={cols || "40"}
            />
        </div>
    </div>
)