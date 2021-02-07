import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from 'react-hook-form';

import { FaUser, FaRegAddressBook, FaBirthdayCake, FaWeight, FaPercentage } from "react-icons/fa";
import { AiFillPhone, AiOutlineColumnHeight  } from "react-icons/ai";
import { GiEncirclement } from "react-icons/gi";
import CustomModal from '../layout/Modal'


export default function EditMember(props) {

    const [date, setDate] = useState(null);
    const [modalShow, setModalShow] = useState(false)
    const [modalStatus, setModalStatus] = useState("")
    const [valErrors, setValErrors] = useState([])
    const [member, setMember] = useState({
        memberId: '',
        firstName: '',
        lastName: '',
        gender: '', 
        address: '',
        phoneNumber: '',
        features: {
            height: '',
            weight:'',
            bodyFat:'',
            waist:''
        }
    })
    
    const onChangeDate = date => {
        setDate(date)
    }

    const handleRadioChange = e => {
        setMember({...member, gender: e.target.value})
    }

    useEffect(() => {
        axios.get(`/api/members/${props.match.params.id}`)
            .then(res => {
                setMember({
                    memberId: res.data.memberId,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    address: res.data.address,
                    phoneNumber: res.data.phoneNumber,
                    gender: res.data.gender,
                    features: {
                        height: res.data.features.height,
                        weight: res.data.features.weight,
                        bodyFat: res.data.features.bodyFat,
                        waist: res.data.features.waist,
                    }
                });
            })
    }, [])

    useEffect(() => {
        axios.get(`/api/members/${props.match.params.id}`)
            .then(res => {
                setDate(Date.parse(res.data.dateOfBirth));
            })
    }, []);

    const { register, handleSubmit } = useForm();

    const onSubmitData = async data => {
        const updatedMember = {
            memberId: member.memberId,
            firstName: data.firstName,
            lastName: data.lastName,
            dateOfBirth: date,
            address: data.address,
            phoneNumber: data.phoneNumber,
            gender: data.gender,
            features: {
                height: data.features.height,
                weight: data.features.weight,
                bodyFat: data.features.bodyFat,
                waist: data.features.bodyFat
            }
        } 
        try {
            const response = await axios.post(`/api/members/update/${props.match.params.id}`, updatedMember)
            if(response){
                console.log(response);
                setModalStatus(response.data)
                setModalShow(true)
            }       
        } catch (error) {
            setModalStatus("Edit Failed")
            setModalShow(true)
            setValErrors(error.response.data.errors)
        }
    }

    return (
        <div className="form-group">
            <form onSubmit  ={handleSubmit(onSubmitData)}>
                <input 
                    disabled="disabled"
                    className="form-control member-id"
                    type="text" 
                    name="memberId" 
                    defaultValue={member.memberId}
                    placeholder="ID" 
                    ref={register}
                />
                <div className="input-container">
                    <FaUser size={20} className="icon required"/>
                    <input 
                        className="form-control" 
                        type="text" 
                        name="firstName" 
                        defaultValue={member.firstName}
                        placeholder="First name" 
                        ref={register} 
                    />
                    <input 
                        className="form-control" 
                        type="text" 
                        name="lastName" 
                        defaultValue={member.lastName}
                        placeholder="Last name" 
                        ref={register} 
                    />
                </div>

                <br/>
                <div className="input-gender">
                    <span id="male">Male</span>
                    <input 
                        type="radio" 
                        value="Male" 
                        name="gender"
                        ref={register}
                        checked = {member.gender === "Male" ? true : false}
                        onChange = {handleRadioChange}
                    /> 
                    <span id="female">Female</span> 
                        <input 
                        type="radio" 
                        value="Female" 
                        name="gender" 
                        ref={register} 
                        checked = {member.gender === "Female" ? true : false}
                        onChange = {handleRadioChange}
                    /> 
                </div>
                
                <br/>
                <div className="input-add">
                    <FaRegAddressBook size={24} className="add-icon" />
                    <input 
                        className="form-control" 
                        type="text" 
                        name="address" 
                        placeholder="Address" 
                        ref={register}
                        defaultValue={member.address}
                    />
                </div>
              
                <br/>
                <div className="input-phone">
                    <AiFillPhone size={22} className="phone-icon"/>
                    <input 
                        className="form-control" 
                        type="text" 
                        name="phoneNumber" 
                        placeholder="Phone Number" 
                        ref={register} 
                        defaultValue={member.phoneNumber}
                    />
                </div>
                <br/>
                <div className="input-bod">
                    <FaBirthdayCake size={18}  className="bod-icon"/>
                    <DatePicker
                        selected = {date}
                        onChange = {onChangeDate} 
                        placeholderText="Select date"   
                    />
                </div>
                <div className="features-group">
                    <h6>Features: </h6>
                    <div className="features-input">
                        <div>
                            <AiOutlineColumnHeight className="features-icon" size={16} />
                            <input 
                                type="text" 
                                placeholder="Height" 
                                name="features.height" 
                                ref={register}
                                defaultValue={member.features.height}
                            />cm
                        </div>
                        <div>
                            <FaWeight className="features-icon" size={14} />
                            <input 
                                type="text" 
                                placeholder="Weight" 
                                name="features.weight" 
                                ref={register}
                                defaultValue={member.features.weight}
                            />kg
                        </div>
                        <div>
                            <FaPercentage className="features-icon" size={14} />
                            <input 
                                type="text" 
                                placeholder="Body Fat Percentage" 
                                name="features.bodyFat" 
                                ref={register}
                                defaultValue={member.features.bodyFat}
                            />%
                        </div>
                        <div>
                            <GiEncirclement className="features-icon" size={14} />
                            <input 
                                type="text" 
                                placeholder="Waist" 
                                name="features.waist" 
                                ref={register}
                                defaultValue={member.features.waist}
                            />cm
                        </div>
                    </div>
                </div>
                <br/>
                <div className="subBtn">
                    <button type="submit" className="submit-form">Edit Log</button>
                </div>
            </form> 

            <CustomModal
                location={'Edit Member'}
                errors={valErrors}
                status={modalStatus}
                show={modalShow}
                onHide={() => setModalShow(false)}
                id={props.match.params.id}
             />

        </div>
    )
}
