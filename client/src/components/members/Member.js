import React from 'react';
import { Link } from 'react-router-dom';

export default function Member({ member }) {

    const { firstName, lastName, gender, dateOfBirth, address, phoneNumber, createdAt } = member;

    return (        
            <tr className="table-row">
                <td><Link to={`/show/${member._id}`} >{firstName}</Link></td>
                <td>{lastName}</td>
                <td>{dateOfBirth ? dateOfBirth.slice(0, 10) : "null"}</td>
                <td>{gender}</td>
                <td>{address}</td>
                <td>{phoneNumber}</td>
                <td>{createdAt.slice(0, 10)}</td>
            </tr>
    )
}
