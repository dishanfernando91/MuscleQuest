import React, { Fragment } from 'react'
import spinner from '../../images/spinner.svg'

export default function Spinner(){
    return (
        <>
            <img
                src= {spinner}
                style={{ width: '200px', paddingTop: "20px", margin: 'auto', display: 'block' }}
                alt='Loading...'
            />
        </>
    )
}