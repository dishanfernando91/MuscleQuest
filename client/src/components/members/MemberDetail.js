import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import noImage from '../../images/no-image-available.jpg'
import axios from 'axios'

export default function MemberDetail(props) {

    const [member, setMember] = useState({});
    const [features, setFeatures] = useState({});
    const { firstName, lastName, address, phoneNumber, gender } = member;
    const [members, setMembers] = useState([])
    
    useEffect(() => {
        axios.get(`/api/members/${props.match.params.id}`)
           .then(res => {
               setMember(res.data)
               setFeatures(res.data.features)}
            )}, [])
            

    useEffect(() => {
        axios.get('/api/members')
        .then(res => {
            setMembers(res.data)
        })
        .catch(err => console.log(err))
    }, [])
    

    return (
        <>
        <div className="member-card" >
            <div className="card-header">
                <h3>{firstName} {lastName} - {gender}</h3>
                <div className="buttons">
                    <button><Link to={`/edit/${member._id}`}>Edit</Link></button> <span>|</span>
                    <button>Set Inactive</button>
                </div>
            </div>
            <div className="card-details">
                <div className="img-container">
                    <img src={noImage} alt="No pic added"/>
                </div>
                <div className="features">
                    <h6>Features:</h6>
                    <p>Height: {features.height}cm</p>
                    <p>Weight: {features.weight}KG</p>
                    <p>Body Fat Percentage: {features.bodyFat}%</p>
                    <p>Waist: {features.waist}cm</p>
                </div>
            </div>
            <div className="contact-info">
                <h6>Address: {address} </h6>
                <h6>Contact: {phoneNumber}</h6>
            </div>
        </div>
        </>
    )
}
