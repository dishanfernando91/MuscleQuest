import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from 'react-hook-form';
import { FaUser, FaRegAddressBook, FaBirthdayCake, FaWeight, FaPercentage } from "react-icons/fa";
import { AiFillPhone, AiOutlineColumnHeight } from "react-icons/ai";
import { GiEncirclement } from "react-icons/gi";
import CustomModal from '../layout/Modal'

export default function CreateMember() {
    
    const { register, handleSubmit, reset } = useForm();

    const [date, setDate] = useState(null)
    // const [memberIds, setMemberIds] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [modalStatus, setModalStatus] = useState("")
    const [valErrors, setValErrors] = useState([])

    // const maxId = ((memberIds.sort((a, b) => a - b).reverse())[0]) + 1;

    const onChangeDate = date => {
        setDate(date)
    }

    // useEffect(() => {
    //     axios.get('/api/members')
    //         .then(members => {
    //             setMemberIds(members.data.map(member => member.memberId))
    //         })
    // }, [])

    const onSubmitData = async data => {
        const member = {
            memberId: data.memberId,
            firstName: data.firstName,
            lastName: data.lastName,
            dateOfBirth: date,
            address: data.address,
            phoneNumber: data.phoneNumber,
            gender: data.gender,
            features: {
                height: (data.features.height),
                weight: (data.features.weight),
                bodyFat: (data.features.bodyFat),
                waist: (data.features.waist),
            }
        }
        try {
            const response = await axios.post('/api/members', member)
            if(response){
                setModalStatus(response.data.msg)
                setModalShow(true)
            }       
        } catch (error) {
            setModalStatus("Submission Failed")
            setModalShow(true)
            setValErrors(error.response.data.errors)
            console.log(error.response.data.errors);
        }
    }

    return (
        <>
        <div className="form-group">
            <form onSubmit={handleSubmit(onSubmitData)}>
                <input 
                    className="form-control member-id"
                    type="number"
                    min="1"
                    name="memberId" 
                    placeholder="ID*"
                    // defaultValue={maxId}
                    ref={register}
                    // required
                />
                <div className="input-container">
                    <FaUser size={20} className="icon"/>
                    <input 
                        className="form-control required" 
                        type="text" 
                        name="firstName" 
                        placeholder="First name*" 
                        ref={register}
                        // required
                    />
                    <input 
                        className="form-control" 
                        type="text" 
                        name="lastName" 
                        placeholder="Last name" 
                        ref={register} 
                    />
                </div>

                <br/>
                <div className="input-gender">
                    <span id="male">Male</span> <input type="radio" value="Male" name="gender" ref={register} /> 
                    <span id="female">Female</span> <input type="radio" value="Female" name="gender" ref={register} /> 
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
                    />
                </div>
                {/* <input type="file" name="picture" ref={register} /> */}
                <br/>
                <div className="input-bod">
                    <FaBirthdayCake size={18}  className="bod-icon"/>
                    <DatePicker
                        selected = {date}
                        onChange = {onChangeDate}
                        placeholderText="Select date"
                        dateFormat='dd/MM/yyyy'
                        maxDate={new Date()}
                    />
                </div>
                <div className="features-group">
                    <h6>Features: </h6>
                    <div className="features-input">
                        <div>
                            <AiOutlineColumnHeight className="features-icon" size={16} /><input type="text" placeholder="Height" name="features.height" ref={register}/>cm
                        </div>
                        <div>
                            <FaWeight className="features-icon" size={14} /><input type="text" placeholder="Weight" name="features.weight" ref={register}/>kg
                        </div>
                        <div>
                            <FaPercentage className="features-icon" size={14} /><input type="text" placeholder="Body Fat Percentage" name="features.bodyFat" ref={register}/>%
                        </div>
                        <div>
                            <GiEncirclement className="features-icon" size={14} /><input type="text" placeholder="Waist" name="features.waist" ref={register}/>cm
                        </div>
                    </div>
                </div>
                <br/>
                <div className="subBtn">
                    <input type="submit" 
                    className="submit-form"/>
                </div>
            </form> 
        </div>
        <CustomModal
            location={'Create Member'}
            errors={valErrors}
            status={modalStatus}
            show={modalShow}
            onHide={() => {
                setModalShow(false)
                reset()
            }}
        />
        </>

    )
}
