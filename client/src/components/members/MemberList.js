import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import Member from './Member'
import axios from 'axios';

export default function MemberList() {

    const [members, setMembers] = useState([])

    useEffect(() => {
        axios.get('/api/members')
        .then(res => {
            setMembers(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    const setStatus = id => {
        setMembers(members.map(member => {
            if(member._id === id) {
               return ({
                   ...member,
                   status: !member.status
                })
            } else {
                return member
            }
        }))
        const updatedMember = (members.find(member => member._id === id))
        axios.post(`/api/members/update/${id}`, ({...updatedMember, status: !updatedMember.status}))
            .then(res => res.data)
    
    }

    

    const memberList = () => {
        return (members.sort((x, y) => (x.status === y.status) ? 0 : x.status ? -1 : 1)).map(currentMember => {
            return <Member member={currentMember} key={currentMember._id} setStatus={setStatus} />
        })
    }

    return (
        <div className="container">
            <table className="table">
            <thead className="thead-light">
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Date of Birth</th>
                    <th>Gender</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>Commencement</th>
                    <th>Activity</th>
                </tr>
            </thead>
            <tbody>
                {memberList()}
            </tbody>
            </table>
        </div>
    )
}
