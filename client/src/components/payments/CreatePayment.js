import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import CustomModal from '../layout/Modal'

export default function CreatePayment() {

    const { handleSubmit, control, reset } = useForm();
    const [packages, setPackages] = useState([])
    const [allPayments, setAllPayments] = useState({});
    const [members, setMembers] = useState([]);

    // Modal Settings
    const [modalShow, setModalShow] = useState(false)
    const [modalStatus, setModalStatus] = useState("")
    const [valErrors, setValErrors] = useState([])

    useEffect(() => {
        axios.get('/api/members/')
        .then(res => {
            setMembers(res.data.filter(member => member.status));
        })
        .catch(err => console.log(err))

        axios.get('/api/payments/')
        .then(res => {
            setAllPayments(res.data)
        })
        .catch(err => console.log(err))

        axios.get('/api/packages/')
        .then(res => {
            setPackages(res.data)
        })
        .catch(err => console.log(err))

    }, [])

    // React Select Options
    const memberOptions = members.map(member => {
       return {value: member, label: `${member.memberId} - ${member.firstName} ${member.lastName}`}
    })

    // const memberIdOptions = members.map(member => {
    //     return {value: member.memberId, label: `${member.memberId}`}
    // })

    const packageOptions = packages.filter(gymPackage => gymPackage.status).map(gymPackage => {
           return { value: gymPackage, label: gymPackage.title } 
    });

    const months = [    
        {value: "January", label: "January"},
        {value: "February", label: "February"},
        {value: "March", label: "March"},
        {value: "April", label: "April"},
        {value: "May", label: "May"},
        {value: "June", label: "June"},
        {value: "July", label: "July"},
        {value: "August", label: "August"},
        {value: "September", label: "September"},
        {value: "October", label: "October"},
        {value: "November", label: "November"},
        {value: "December", label: "December"}
        ];

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().toLocaleDateString('default', { month: 'long' });

    const onSubmitData = async data => {

        const lastEntry = allPayments[allPayments.length - 1]
        const allMonths = allPayments.map(record => record.month)
        const allYears = allPayments.map(record => record.year)

        const diffMonth = newMonth => {
            for(let i = 0; i < allPayments.length; i++){
                if(((allPayments[i].year).toString() === currentYear.toString()) && ((allPayments[i].month).toString()) === newMonth.toString())
                    return allPayments[i]._id 
            }
        }

        if(data.member && data.gymPackage) {
            const payment = {   
                month: data.months.value,
                payments: [{
                    memberID: data.member.value._id,
                    package: data.gymPackage.value._id
                }]
            }
            try {
                if(allPayments.length === 0){
                    const response = await axios.post('/api/payments/add', payment)
                    if(response){
                        console.log(response)
                        setModalStatus(response.data)
                        setModalShow(true)
                    } 
                } else if(currentMonth === lastEntry.month && currentYear === lastEntry.year) {
                    const response = await axios.put(`/api/payments/update/${lastEntry._id}`, payment)
                    if(response){
                        setModalStatus(response.data)
                        setModalShow(true)
                    }     
        
                } else if(allMonths.includes(data.months.value) && allYears.includes(currentYear.toString())){
                    const response = await axios.put(`/api/payments/update/${diffMonth(data.months.value)}`, payment)
                    if(response){
                        setModalStatus(response.data)
                        setModalShow(true)
                    } 
                } else {
                    const response = await axios.post('/api/payments/add', payment)
                    if(response){
                        setModalStatus(response.data)
                        setModalShow(true)
                    } 
                }
            } catch (error) {
                setModalStatus("Submission Failed")
                setModalShow(true)
                setValErrors(error.response.data.errors)
                console.log(error.response.data.errors);
            }
        } else {
            setModalStatus("Submission Failed")
            setModalShow(true)
            setValErrors([{msg: "Member ID and Package details needed"}])
        }
        // window.location.reload(false);
    }  

    return (
        <>
        <h3 className="pyt-head">Payment Selection</h3>
        <div className="pyt-container">
            <div className="pyt-form">
                <form onSubmit={handleSubmit(onSubmitData)}>
                {/* <Controller
                    as={<Select
                        options={memberIdOptions} />}
                    name="memberId"
                    control={control}
                    placeholder="Member ID"
                    className="pyt-selector"
                /> */}
                <Controller
                    as={<Select 
                        options={months}/>}
                        name="months"
                        control={control}
                        isSearchable
                        defaultValue={{ value: currentMonth, label: currentMonth }}
                        className="pyt-selector"
                    />
                <Controller
                    as={<Select options={memberOptions}/>}
                    name="member"
                    control={control}
                    isSearchable
                    placeholder="Enter Name"
                    className="pyt-selector"
                />
                <Controller
                    as={<Select options={packageOptions}/>}
                    name="gymPackage"
                    control={control}
                    isSearchable
                    placeholder="Package"
                    className="pyt-selector"
                />
                <input type="submit" className="pyt-form-btn"/>
                </form>
            </div>
            <div className="pyt-history-link">
                <Link className="pyt-history-text" to={`/payments/history`}>View Payment History</Link>
            </div>
        </div>
        <CustomModal
            location={'Create Payment'}
            errors={valErrors}
            status={modalStatus}
            show={modalShow}
            onHide={() => {
                setModalShow(false)
                reset()
                setValErrors([])
            }}
        />
        </>
    )
}
