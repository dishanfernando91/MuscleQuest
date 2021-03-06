import React from 'react';
import { Link } from 'react-router-dom';

export default function Member({ member, setStatus }) {

    const { memberId, firstName, lastName, gender, dateOfBirth, address, phoneNumber, createdAt, status, _id } = member;

    return (        
            <tr className={status ? "table-row" : "inactive-table-row"}>
                <td>{memberId}</td>
                <td><Link to={`/show/${member._id}`} >{firstName}</Link></td>
                <td>{lastName ? lastName : "-"}</td>
                <td>{dateOfBirth ? dateOfBirth.slice(0, 10) : "-"}</td>
                <td>{gender ? gender : "-"}</td>
                <td>{address ? address : "-"}</td>
                <td>{phoneNumber ? phoneNumber : "-"}</td>
                <td>{createdAt.slice(0, 10)}</td>
                <td onClick={() => setStatus(_id)}>{status ? "Active" : "Inactive"}</td>
            </tr>
    )
}
