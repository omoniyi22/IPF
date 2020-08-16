import React from 'react'
import { FormButton } from './components'

function EventRole({title, details, onClick}) {
    return (
        <div className="row border-bottom event-role-item">
            <div className="col-md-8">
                <h4 style={{fontSize: 24}} className="book-family">{title}</h4>
                <h6 className="book-family">{details}</h6>
            </div>
            <div className="col-md-4">
                <div className="row h-100 align-items-center">
                    <FormButton onClick={onClick}>View</FormButton>
                </div>
            </div>
        </div>
    )
}

export default EventRole;