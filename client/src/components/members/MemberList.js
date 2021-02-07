import React, { useState, useEffect, useReducer } from 'react';
import Select from 'react-select'
import Member from '../members/Member'
import axios from 'axios';
import Spinner from '../layout/Spinner'


export default function MemberList() {

    const [members, setMembers] = useState([])
    const [active, toggleActive] = useReducer(active => !active)
    const [inactive, toggleInactive] = useReducer(inactive => !inactive)
    const [searchQuery, setSearch] = useState("")
    const [sortQuery, setSort] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get('/api/members')
        .then(res => {
            setMembers(res.data)
            setIsLoading(false)
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
        let updatedMember = (members.find(member => member._id === id))
        axios.post(`/api/members/update/${id}`, ({...updatedMember, status: !updatedMember.status}))
            .then(res => console.log(res.data))
        // console.log(updatedMember)
    }

    const options = [
        { value: 'nameAsc', label: 'Name - Ascending'},
        { value: 'nameDsc', label: 'Name - Descending'},
        { value: 'idAsc', label: 'ID - Ascending'},
        { value: 'idDsc', label: 'ID - Descending'},
    ]

    const handleChange = sortQuery => {
        setSort(sortQuery.value)
      };

    const memberList = () => {
        if(active) {
            return (members.filter(member => member.status === true)).map(currentMember => {
                return <Member member={currentMember} key={currentMember._id} setStatus={setStatus} />
            })
        }
        if(inactive) {
            return (members.filter(member => member.status === false)).map(currentMember => {
                return <Member member={currentMember} key={currentMember._id} setStatus={setStatus} />
            })
        }
        if(!!searchQuery){
            const searchedMembers = members.filter(member => {
                return member.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || member.lastName.toLowerCase().includes(searchQuery.toLowerCase())
            })
            return (searchedMembers).map(currentMember => {
                return <Member member={currentMember} key={currentMember._id} setStatus={setStatus} />
                })
       
        } 
        if(!!sortQuery){
            if(sortQuery === 'nameAsc'){
                return (members.sort((x, y) => (x.firstName < y.firstName) ? -1 : 1)).map(currentMember => {
                    return <Member member={currentMember} key={currentMember._id} setStatus={setStatus} />
                })}
            if(sortQuery === 'nameDsc'){
                return (members.sort((x, y) => (x.firstName > y.firstName) ? -1 : 1)).map(currentMember => {
                    return <Member member={currentMember} key={currentMember._id} setStatus={setStatus} />
                })}
            if(sortQuery === 'idAsc'){
                return (members.sort((x, y) => (x.memberId < y.memberId) ? -1 : 1)).map(currentMember => {
                    return <Member member={currentMember} key={currentMember._id} setStatus={setStatus} />
                })
            }
            if(sortQuery === 'idDsc'){
                return (members.sort((x, y) => (x.memberId > y.memberId) ? -1 : 1)).map(currentMember => {
                    return <Member member={currentMember} key={currentMember._id} setStatus={setStatus} />
                })
            }
    }
        else {
        return (members.sort((x, y) => (x.status === y.status) ? 0 : x.status ? -1 : 1)).map(currentMember => {
            return <Member member={currentMember} key={currentMember._id} setStatus={setStatus} />
        })}
    }

    return (
        <div className="container">
            <div className="searchTab">
                <input className="searchBar" type="text" placeholder="Search..." onChange={e => setSearch(e.target.value)}/>
                <div className="activity-checkbox">
                    <input type="checkbox" value={active} onChange={toggleActive} disabled={inactive ? true : false}/>Active
                    <input type="checkbox" value={inactive} onChange={toggleInactive} disabled={active ? true : false}/>Inactive
                </div>
              
                <span>
                    <Select
                        placeholder="Sort by..."
                        className="sort-tab"
                        options={options} 
                        onChange={handleChange}
                    />
                </span>
            </div>
            { isLoading ? 
                <Spinner />
            : 
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
        }
        </div>
    )
}
