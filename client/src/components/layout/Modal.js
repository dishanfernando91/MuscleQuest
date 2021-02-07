import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function CustomModal({ status, errors, location, id, ...props}) {
// console.log(errors);
    const renderBody = () => {
        if(errors.length !== 0){
          return errors.map((err, i) => {
            return <p key={i}>{err.msg}</p>
          })
        }
     }

    const renderFooter = () => {
      // @Create new member
      if(location === 'Create Member'){
        if(errors && errors.length === 0) {
          return (
            <>
              <Link to={`/show`}><Button>View Member List</Button></Link>
              <Button onClick={props.onHide}>Add More</Button>
            </>
            )
        } else {
            return (
              <>
                <Button onClick={props.onHide}>Close</Button>
              </>
            )
        }
      // @Edit existing member
      } else if(location === 'Edit Member'){
        if(errors && errors.length === 0) {
          return (
            <>
              <Link to={`/show`}><Button>View List</Button></Link>
              <Link to={`/show/${id}`}><Button>Go Back</Button></Link>
            </>
            )
        } else {
            return (
              <>
                <Button onClick={props.onHide}>Close</Button>
              </>
            )
        }
      }

      // @Create package
      else if(location === 'Create Package'){
        if(errors && errors.length === 0) {
          return (
            <>
              <Button onClick={props.onHide}>Close</Button>
            </>
            )
        } else {
            return (
              <>
                <Button onClick={props.onHide}>Close</Button>
              </>
            )
        }
      }

       // @Create payment
       else if(location === 'Create Payment'){
        if(errors && errors.length === 0) {
          return (
            <>
              <Button onClick={props.onHide}>Close</Button>
            </>
            )
        } else {
            return (
              <>
                <Button onClick={props.onHide}>Close</Button>
              </>
            )
        }
      }

    }
    
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          {status}
          </Modal.Title>
        </Modal.Header>
        
        {errors && errors.length > 0 ? 
        <Modal.Body>
          {renderBody()}
        </Modal.Body> : <></>}
        
        
        <Modal.Footer>
          {renderFooter()}
        </Modal.Footer>
      </Modal>
    );
  }