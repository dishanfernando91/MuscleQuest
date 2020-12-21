import React from 'react'

export default function UnpaidTracker({ member: { memberId, name, status } }) {
    return (
        <div className="pyt-pending-entry">
            { status ? <p style={ {color: "red"} }>{memberId} - {name}</p> : <></> }
        </div>
    )
}
