import React from 'react';

export default function Payment({ payment }) {

    const { memberId, name, packages, date } = payment;
    return (        
            <tr className="table-row">
                <td>{memberId}</td>
                <td>{name}</td>
                <td>{packages}</td>
                <td>{date}</td>
            </tr>
    )
}
