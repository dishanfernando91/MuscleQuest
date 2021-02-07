import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import CustomModal from '../layout/Modal'

import PackageDetails from './PackageDetails'

export default function CreatePackage() {

    const { register, handleSubmit, reset } = useForm();
    const [packages, setPackages] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [modalStatus, setModalStatus] = useState("")
    const [valErrors, setValErrors] = useState([])
    
    useEffect(() => {
        axios.get('/api/packages')
        .then(res => {
            setPackages(res.data)
        })
        .catch(err => console.log(err))
    }, [])
    
    const onSubmitData = async data => {
        const packageInfo = {
            title: data.title,
            fee: data.fee,
            duration: data.duration,
        }
        try {
            const response = await axios.post('/api/packages', packageInfo)
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
    
    const packageList = () => {
        return packages.sort((x, y) => (x.status === y.status) ? 0 : x.status ? -1 : 1).map(currentPackage => {
            return <PackageDetails package={currentPackage} key={currentPackage._id} setInactive={setInactive}/>
        })
    }

    const setInactive = id => {
        const {title, fee, duration, status} = packages.find(packages => packages._id === id)

        const packageInfo = {
            title,
            fee,
            duration,
            status: !status
        }
        axios.post(`/api/packages/${id}`, packageInfo)
            .then(response => {
                console.log(response.data)
            });
            
        window.location = './packages'
    }

    return (
        <div className="container">
            <div className="pkg-group">
                {packageList()}
            </div>
            <form onSubmit={handleSubmit(onSubmitData)}>
                <div className="pkg-form">
                    <input type="text" placeholder="Package title" name="title" ref={register}/>
                    <input type="number" placeholder="Fee (Rs.)" name="fee" ref={register}/>
                    <input type="number" placeholder="Duration (Days)" name="duration" ref={register}/>
                </div>
                <div className="pkg-button">
                    <input type="submit"
                        text="Create Payment"
                        className="submit-form"
                    />
                </div>
            </form>
            <CustomModal
                location={'Create Package'}
                errors={valErrors}
                status={modalStatus}
                show={modalShow}
                onHide={() => {
                    setModalShow(false)
                    reset()
                    setValErrors([])
                }}
        />
        </div>
    )
}
